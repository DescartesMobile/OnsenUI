/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from '../ons/base-element';
import contentReady from '../ons/content-ready';

const scheme = {
  '': 'select-*',
  '.select-input': 'select-input--*'
};

const defaultClassName = 'select';

/**
 * @element ons-select
 * @category form
 * @modifier outline
 *   [en]Select with outline and transparent background[/en]
 *   [ja]アウトラインを持ったボタンを表示します。[/ja]
 * @modifier light
 *   [en]Button that doesn't stand out.[/en]
 *   [ja]目立たないボタンを表示します。[/ja]
 * @modifier quiet
 *   [en]Button with no outline and or background..[/en]
 *   [ja]枠線や背景が無い文字だけのボタンを表示します。[/ja]
 * @modifier cta
 *   [en]Button that really stands out.[/en]
 *   [ja]目立つボタンを表示します。[/ja]
 * @modifier large
 *   [en]Large button that covers the width of the screen.[/en]
 *   [ja]横いっぱいに広がる大きなボタンを表示します。[/ja]
 * @modifier large--quiet
 *   [en]Large quiet button.[/en]
 *   [ja]横いっぱいに広がるquietボタンを表示します。[/ja]
 * @modifier large--cta
 *   [en]Large call to action button.[/en]
 *   [ja]横いっぱいに広がるctaボタンを表示します。[/ja]
 * @modifier material
 *   [en]Material Design button[/en]
 *   [ja]マテリアルデザインのボタン[/ja]
 * @modifier material--flat
 *   [en]Material Design flat button[/en]
 *   [ja]マテリアルデザインのフラットボタン[/ja]
 * @description
 *   [en]
 *     Select component. If you want to place a select on a page, use `<ons-select>`.
 *
 *     Will automatically display as a Material Design select on Android.
 *   [/en]
 *   [ja]ボタン用コンポーネント。ツールバーにボタンを設置する場合は、ons-toolbar-buttonもしくはons-back-buttonコンポーネントを使用します。[/ja]
 * @codepen hLayx
 * @tutorial vanilla/Reference/button
 * @guide Button [en]Guide for `<ons-button>`[/en][ja]<ons-button>の使い方[/ja]
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @guide cross-platform-styling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-button modifier="large--cta">
 *   Tap Me
 * </ons-button>
 */

export default class SelectElement extends BaseElement {

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the select.[/en]
   *  [ja]ボタンの表現を指定します。[/ja]
   */

  /**
   * @attribute ripple
   * @description
   *  [en]If this attribute is defined, the button will have a ripple effect.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  init() {
    contentReady(this, () => {
      this._compile();
      ['checked', 'disabled', 'modifier', 'name', 'input-id'].forEach(e => {
        this.attributeChangedCallback(e, null, this.getAttribute(e));
      });
    });
  }

  static get observedAttributes() {
    return ['modifier', 'class'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the select is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    const sel = document.createElement('select');
    sel.classList.add('select-input');

    util.arrayFrom(this.childNodes).forEach(element => sel.appendChild(element));

    this.appendChild(sel);

    ModifierUtil.initModifier(this, scheme);
  }
}

customElements.define('ons-select', SelectElement);
