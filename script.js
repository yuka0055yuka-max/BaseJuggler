document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        dec: document.getElementById('dec-input'),
        bin: document.getElementById('bin-input'),
        oct: document.getElementById('oct-input'),
        hex: document.getElementById('hex-input'),
    };

    const clearButton = document.getElementById('clear-button');

    // このフラグは、プログラムによって値が設定される際の無限ループを防ぐために使用します
    let isUpdating = false;

    // 各入力フィールドにイベントリスナーを設定
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', (e) => {
            if (isUpdating) return;
            handleInput(e.target);
        });
    });

    /**
     * 入力を処理し、他のすべてのフィールドを更新する関数
     * @param {HTMLInputElement} sourceInput - 変更が発生した入力要素
     */
    function handleInput(sourceInput) {
        const sourceBase = parseInt(sourceInput.dataset.base, 10);
        const sourceValue = sourceInput.value.trim();

        // すべての入力のハイライトを一旦リセット
        Object.values(inputs).forEach(input => input.classList.remove('valid', 'invalid'));

        // 入力が空の場合、すべてのフィールドをクリア
        if (sourceValue === '') {
            clearAllInputs();
            return;
        }

        // 入力値のバリデーション（検証）
        const validationRegex = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^[0-9]+$/,
            16: /^[0-9A-F]+$/i,
        };

        if (!validationRegex[sourceBase].test(sourceValue)) {
            sourceInput.classList.add('invalid');
            // 無効な入力があった場合、他のフィールドは更新しない
            return;
        }
        
        sourceInput.classList.add('valid');

        // Step 1: どの基数からでも、まず10進数のBigIntに変換する
        // BigIntは非常に大きな整数を扱うことができ、精度の問題を回避します
        let decimalValue;
        try {
            if (sourceBase === 10) {
                decimalValue = BigInt(sourceValue);
            } else if (sourceBase === 16) {
                decimalValue = BigInt('0x' + sourceValue);
            } else {
                 // 2進数と8進数はBigIntが直接サポートしていないため、手動でパース
                 let tempValue = BigInt(0);
                 for (let i = 0; i < sourceValue.length; i++) {
                     tempValue = tempValue * BigInt(sourceBase) + BigInt(parseInt(sourceValue[i], sourceBase));
                 }
                 decimalValue = tempValue;
            }
        } catch (e) {
            sourceInput.classList.add('invalid');
            console.error("Conversion error:", e);
            return;
        }


        // Step 2: 10進数のBigIntから他の基数に変換し、フィールドを更新
        isUpdating = true; // 無限ループ防止フラグを立てる
        
        Object.values(inputs).forEach(targetInput => {
            if (targetInput === sourceInput) return; // 自分自身は更新しない

            const targetBase = parseInt(targetInput.dataset.base, 10);
            try {
                targetInput.value = decimalValue.toString(targetBase).toUpperCase();
            } catch (e) {
                targetInput.value = "Error"; // 変換エラー時
            }
        });

        isUpdating = false; // フラグを解除
    }
    
    /**
     * すべての入力フィールドをクリアする関数
     */
    function clearAllInputs() {
        isUpdating = true;
        Object.values(inputs).forEach(input => {
            input.value = '';
            input.classList.remove('valid', 'invalid');
        });
        isUpdating = false;
    }
    
    clearButton.addEventListener('click', clearAllInputs);

    // --- Service Workerの登録 ---
    // 'serviceWorker'がブラウザでサポートされているか確認
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker 登録成功: ', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker 登録失敗: ', error);
                });
        });
    }
});
