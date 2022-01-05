import getProfile from './profile';
import './style.css';

function draw() {
    const el = document.createElement('div');
    const btn = document.createElement('button');
    el.innerHTML = 'Hello WebPack';
    el.classList.add('hello');

    btn.innerHTML = 'GET PROF';
    btn.onclick = getProfile;
    el.appendChild(btn);
    return el;
}

document.body.appendChild(draw());
