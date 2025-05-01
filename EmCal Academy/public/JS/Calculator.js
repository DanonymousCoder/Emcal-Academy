function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        let expression = display.value;
        // Replace 'sqrt' with 'Math.sqrt'
        expression = expression.replace(/sqrt/g, 'Math.sqrt');
        // Replace 'sin' with 'Math.sin'
        expression = expression.replace(/sin/g, 'Math.sin');
        // Replace 'cos' with 'Math.cos'
        expression = expression.replace(/cos/g, 'Math.cos');
        // Replace 'tan' with 'Math.tan'
        expression = expression.replace(/tan/g, 'Math.tan');
        // Replace '^' with '' for exponentiation
        expression = expression.replace(/\^/g, '');
        // Replace 'pi' with 'Math.PI'
        expression = expression.replace(/pi/g, 'Math.PI');
        // Evaluate the expression
        display.value = eval(expression);
       
        
    } catch (error) {
        display.value = 'Error';
    }
    function square() {
        const display = document.getElementById('display');
        const currentValue = parseFloat(display.value); 
        if (!isNaN(currentValue)) { 
            const squaredValue = currentValue * currentValue; 
            display.value = squaredValue; 
        } else {
            display.value = 'Error'; 
        }
    }
}