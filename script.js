document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        dec: document.getElementById('dec-input'),
        bin: document.getElementById('bin-input'),
        oct: document.getElementById('oct-input'),
        hex: document.getElementById('hex-input'),
    };

    const clearButton = document.getElementById('clear-button');
    let isUpdating = false;

    Object.values(inputs).forEach(input => {
        input.addEventListener('input', (e) => {
            if (isUpdating) return;
            handleInput(e.target);
        });
    });

    function handleInput(sourceInput) {
        const sourceBase = parseInt(sourceInput.dataset.base, 10);
        const sourceValue = sourceInput.value.trim();

        Object.values(inputs).forEach(input => input.classList.remove('valid', 'invalid'));

        if (sourceValue === '') {
            clearAllInputs();
            return;
        }

        const validationRegex = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^[0-9]+$/,
            16: /^[0-9A-F]+$/i,
        };

        if (!validationRegex[sourceBase].test(sourceValue)) {
            sourceInput.classList.add('invalid');
            return;
        }

        sourceInput.classList.add('valid');

        let decimalValue;
        try {
            if (sourceBase === 10) {
                decimalValue = BigInt(sourceValue);
            } else if (sourceBase === 16) {
                decimalValue = BigInt('0x' + sourceValue);
            } else {
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

        isUpdating = true;
        Object.values(inputs).forEach(targetInput => {
            if (targetInput === sourceInput) return;
            const targetBase = parseInt(targetInput.dataset.base, 10);
            try {
                targetInput.value = decimalValue.toString(targetBase).toUpperCase();
            } catch (e) {
                targetInput.value = "Error";
            }
        });
        isUpdating = false;
    }

    function clearAllInputs() {
        isUpdating = true;
        Object.values(inputs).forEach(input => {
            input.value = '';
            input.classList.remove('valid', 'invalid');
        });
        isUpdating = false;
    }

    clearButton.addEventListener('click', clearAllInputs);

    // --- Service Workerの登録（GitHub Pages対応） ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/BaseJuggler/sw.js')
                .then(registration => {
                    console.log('Service Worker 登録成功: ', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker 登録失敗: ', error);
                });
        });
    }
});
