'use strict';

onlyChrome(describe)('OnsLazyRepeatElement', () => {
  let element;
  let lazyRepeat;

  beforeEach((done) => {
    element = ons._util.createElement(`
      <ons-page>
        <ons-toolbar>
          <div class="center"></div>
        </ons-toolbar>
        <ons-list>
          <ons-lazy-repeat id="my-lazy-repeat">
            <ons-list-item>aaa</ons-list-item>
          </ons-lazy-repeat>
        </ons-list>
      </ons-page>
    `);

    document.body.appendChild(element);
    lazyRepeat = document.querySelector('#my-lazy-repeat');

    lazyRepeat.delegate = {
      createItemContent: (i, template) => {
        var dom = template.cloneNode(true);
        dom.innerText = i;

        return dom;
      },

      countItems: () => 10000000
    };

    lazyRepeat._lazyRepeatProvider.ready.then(done);
  });

  afterEach(() => {
    element.remove();
    element = lazyRepeat = null;
  });

  it('should exist', () => {
    expect(window.ons.LazyRepeatElement).to.be.ok;
  });

  describe('#refresh', () => {
    it('should be callable', (done) => {
      lazyRepeat.refresh().then(done);
    });
  });

  describe('#delegate', () => {
    it('should accept delegate object twice', () => {
      lazyRepeat.delegate = {
        countItems: () => 42,
        createItemContent: i => document.createElement('div')
      };
    });
  });
});
