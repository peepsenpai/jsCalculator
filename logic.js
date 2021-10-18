
const numbers = document.querySelectorAll('[data-numbers]'),
    operation = document.querySelectorAll('[data-operator]'),
    previous = document.querySelector('[data-previous]'),
    current = document.querySelector('[data-current]'),
    equals = document.querySelector('[data-equals]'),
    deleteAll = document.querySelector('[data-clearAll]'),
    deleteButton = document.querySelector('[data-delete]');


class calculator {
    constructor(previousText, CurrentText) {
        this.previousText = previousText;
        this.CurrentText = CurrentText;
        this.deleteAllFunc();
    }

    deleteAllFunc() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    deleteFunc() {
        if (this.previousOperand === '' || this.currentOperand !== '') {
            this.currentOperand = this.currentOperand.slice(0, -1) // -1 remove the last element from the array
        }
        else if (this.previousOperand !== '' && this.currentOperand === '' && this.operation !== '') {
            this.currentOperand = this.previousOperand + this.operation; // string + number = string
            this.currentOperand = this.currentOperand.slice(0, -1)
            this.previousOperand = ''
        }
        else {
            return
        }
    }
    appendNumberFunc(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return true;
        }
        if (this.operation === '' && this.currentOperand !== '') return
        this.currentOperand = this.currentOperand + number;
    }

    operationFunc(operation) {
        if (this.currentOperand === '') {
            return
        }
        if (this.previousOperand !== '') {
            this.computeFunc();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    computeFunc() {
        let result
        const prev = parseFloat(this.previousOperand);
        const curnt = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curnt)) return

        if (this.operation === '+') {
            result = prev + curnt;
        }
        else if (this.operation === '-') {
            result = prev - curnt;
        }
        else if (this.operation === 'x') {
            result = prev * curnt;
        }
        else if (this.operation === '%') {
            result = prev / curnt;
        }
        else {
            return
        }

        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = '';

    }

    updateFunc() {
        this.CurrentText.innerText = this.currentOperand;
        if (this.previousOperand === '') {
            this.previousText.innerText = this.previousOperand;
        }
        else {
            this.previousText.innerText = this.previousOperand + ' ' + this.operation;
        }
    }
}

const Calculate = new calculator(previous, current);

deleteAll.addEventListener('click', () => {
    Calculate.deleteAllFunc();
    Calculate.updateFunc();
})

numbers.forEach(button => {
    button.addEventListener('click', () => {
        Calculate.appendNumberFunc(button.innerText);
        Calculate.updateFunc()
    })
});


operation.forEach(button => {
    button.addEventListener('click', () => {
        Calculate.operationFunc(button.innerText);
        Calculate.updateFunc()
    })
});

equals.addEventListener('click', () => {
    Calculate.computeFunc();
    Calculate.updateFunc();
})

deleteButton.addEventListener('click', () => {
    Calculate.deleteFunc();
    Calculate.updateFunc()
})




