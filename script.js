const display = document.getElementById('display');

    // Append value to the display
    function append(value) {
        // Clean up visual appearance for operators
        let displayValue = value;
        if (value === '**') displayValue = '^';
        
        display.value += value;
    }

    // Clear the entire display
    function clearDisplay() {
        display.value = '';
    }

    // Delete last character
    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    // Perform the calculation
    function calculate() {
        try {
            // We use eval carefully. Since it's a local calculator, 
            // it evaluates the Math. functions we've appended.
            let expression = display.value;
            
            // Handle cases where brackets aren't closed
            const openBrackets = (expression.match(/\(/g) || []).length;
            const closeBrackets = (expression.match(/\)/g) || []).length;
            for(let i = 0; i < openBrackets - closeBrackets; i++) {
                expression += ')';
            }

            let result = eval(expression);
            
            // Handle precision issues (e.g., 0.1 + 0.2)
            if (!Number.isInteger(result)) {
                result = parseFloat(result.toFixed(8));
            }
            
            display.value = result;
        } catch (error) {
            display.value = "Error";
            setTimeout(clearDisplay, 1500);
        }
    }

    // Allow keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') append(e.key);
        if (e.key === '.') append('.');
        if (e.key === '+') append('+');
        if (e.key === '-') append('-');
        if (e.key === '*') append('*');
        if (e.key === '/') append('/');
        if (e.key === '(') append('(');
        if (e.key === ')') append(')');
        if (e.key === 'Enter') calculate();
        if (e.key === 'Backspace') backspace();
        if (e.key === 'Escape') clearDisplay();
    });