document.addEventListener("DOMContentLoaded", function () {
    const calcButtons = document.querySelectorAll(".calc_but");
    const calcInput = document.getElementById("calc_input");
    const calcSubmit = document.getElementById("calc_submit");

    calcButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (button.children.length) {
                document.getElementById("calcHistory").textContent = '';
            }

            if (calcInput.value === "0") {
                if ("0123456789".includes(button.textContent)) {
                    calcInput.value = button.textContent;
                }
            } else {
                if ("0123456789".includes(button.textContent) && calcInput.value.length < 17) {
                    calcInput.value += button.textContent;
                } else if (button.textContent === "C") {
                    calcInput.value = "0";
                } else if (button.textContent === "←") {
                    if (calcInput.value.length > 1) {
                        calcInput.value = calcInput.value.slice(0, -1);
                    } else {
                        calcInput.value = "0";
                    }
                } else if ("0123456789".includes(calcInput.value.slice(-1)) && calcInput.value.length < 17) {
                    if ("+-.%".includes(button.textContent)) {
                        calcInput.value += button.textContent;
                    } else if (button.textContent === "×") {
                        calcInput.value += "*";
                    } else if (button.textContent === "÷") {
                        calcInput.value += "/";
                    }
                }
            }
        });
    });

    calcSubmit.addEventListener("click", function () {
        if (calcInput.value != "0") {
            const result = calculation(calcInput.value);

            const history = document.createElement('div');
            history.classList.add('history_element');
            history.innerText = calcInput.value + '=' + result;
            document.getElementById("calcHistory").prepend(history);

            calcInput.value = result;
        }
    });
});

function calculation(originalString) {
    let str = originalString.replace(/\s/g, '');

    if (!isNumeric(str.slice(-1))) {
        str = str.slice(0, -1);
    }
    if (!isNumeric(str[0])) {
        if (str[0] === '-') {
            str = '0' + str;
        } else {
            str = str.slice(1);
        }
    }

    const numbers = [];
    const operators = [];

    let z = 0;
    for (let i = 0; i < str.length; i++) {
        if (isNumeric(str[i]) || str[i] === '.') {
            if (numbers[z]) {
                numbers[z] += str[i];
            } else {
                numbers.push(str[i]);
            }
        } else {
            z++;
            operators.push(str[i]);
        }
    }

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*') {
            numbers[i] *= numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        } else if (operators[i] === '/') {
            if (numbers[i + 1] !== '0') {
                numbers[i] /= numbers[i + 1];
                numbers.splice(i + 1, 1);
                operators.splice(i, 1);
                i--;
            } else {
                operators.length = 0;
                numbers[0] = 0;
                break;
            }
        } else if (operators[i] === '%') {
            numbers[i] %= numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }
    let result = parseFloat(numbers[0]);

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += parseFloat(numbers[i + 1]);
        } else if (operators[i] === '-') {
            result -= parseFloat(numbers[i + 1]);
        }
    }
    return result;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}