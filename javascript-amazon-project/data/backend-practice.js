const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    let msg = xhr.response;
    console.log(msg);
})
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();