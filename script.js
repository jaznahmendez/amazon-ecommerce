let cont = 0;
function AddClick() {
    cont++;
    document.getElementById('click-button').innerHTML = 'button clicked ' + cont + ' times!';
}

let text = true;
function ChangeText() {
    if (text) {
        document.getElementById('text-change').innerHTML = '<p id="red">RED!!!</p>';
        text = false;
    } else {
        document.getElementById('text-change').innerHTML = '<p id="blue">BLUE!!!</p>';
        text = true;
    }
}

function updateSelectedOption() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    document.getElementById('selected-option').textContent = `Option selected: ${selectedOption}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[name="option"]');
    radioButtons.forEach(button => {
        button.addEventListener('click', updateSelectedOption);
    });
});
