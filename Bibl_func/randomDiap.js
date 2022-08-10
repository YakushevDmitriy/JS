// получение целого случайного числа в заданном диапазоне
function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}