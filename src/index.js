import encryptor from 'simple-encryptor';

document.body.classList.add('bg-to-wite');

const next = (arr, ...args) => arr.length > 0 ? arr.shift()(...args) : null;
const track = (id) => {
    if (!window.ga) return;
    window.dataLayer.push({
        event: 'screen',
        screen: id
    });
}

const typingTitle = (titles, cb) => {

    titles = titles.map(el => {

        let letters = el.innerHTML.split('');

        const stopTyping = (resolve) => {

            if (titles.length === 0) {
                resolve();
            }

            // If last title
            if (titles.length !== 0) {
                el.classList.add('typed--end');
                el.classList.remove('typed');
            }

            next(titles);
        };

        // Closures
        // 1- letter, iterator
        // 2- time of the setTimeout
        // 3- the append letter function.
        letters = letters.map((l,i) => (time, resolve) => setTimeout(() => {

            const span = document.createElement('span');

            span.innerHTML = l;
            el.appendChild(span);

            // if last letter
            if (letters.length === 0) {
                stopTyping(resolve);
                return;
            }

            next(letters, 30, resolve);

        }, time));

        el.innerHTML = '';

        return () => {

            new Promise((resolve) => {

                next(letters, 2000, resolve);
                el.classList.add('typed');

            }).then(() => cb());
        };

    });

    return next(titles);

};

const slides = Array.from(document.querySelectorAll('.slide'));

const $yesPlans = document.querySelector('.yes-plans');
const $noPlans = document.querySelector('.no-plans');
const $yesJoin = document.querySelector('.yes-join');
const $noJoin = document.querySelector('.no-join');
const $input = document.querySelector('input');
const $submit = document.querySelector('.submit');

const slide = (id) => {

    track(id);

    const found = slides.filter(s => s.id === id);
    if (found.length === 0) {
        console.warn(`Slide ${slide} not found`);
        return;
    }

    slides.forEach(el => el.classList.remove('active'));

    const slide = found[0];
    slide.classList.add('active');

    const titles = slide.querySelectorAll('h1');
    new Promise((resolve) => {
        typingTitle(Array.from(titles), resolve);

    }).then(() => {

        slide.classList.add('slide--show-controls');

    });


};

const validPassword = () => {

    const password = $input.value;
    const content = encryptor(`amazing-bday-party-${password}`).decrypt(details);

    if (!content) {

        $input.classList.add('error');
        return false;

    }

    document.querySelector('#details').innerHTML = content;

    return true;

};


const listener = ({ target, key }) => {

    switch(true) {

    case target.isSameNode($noJoin):
    case target.isSameNode($yesPlans):
        slide('no');
        break;
    case target.isSameNode($noPlans):
        slide('wanna-party');
        break;
    case target.isSameNode($yesJoin):
        slide('password');
        break;
    case target.isSameNode($input) && key === 'Enter':
    case target.isSameNode($submit):
        if (validPassword()) {
            slide('details');
            return;
        }

        break;

    }

};

['click', 'keydown'].forEach(e => document.body.addEventListener(e, listener));

setTimeout(() => {

    slide('welkome');

});

const details = "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";

window.encryptor = encryptor;
