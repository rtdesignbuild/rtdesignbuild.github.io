/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(Drupal){'use strict';function init(context){var elements=context.querySelectorAll('[data-mail-to]');var clickable=context.querySelectorAll('[data-mail-click-link]');if(!elements)return;function rot13(string){return string.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});}function normalizeEncryptEmail(string){string=rot13(string);string=string.replace(/\/dot\//g,'.');string=string.replace(/\/at\//g,'@');var encodedString=Drupal.checkPlain(string);encodedString=encodedString.replace(/&amp;/g,'&');return encodedString;}function setMailAddress(element){var mailTo=normalizeEncryptEmail(element.getAttribute('data-mail-to'));var replaceInner=element.getAttribute('data-replace-inner');element.removeAttribute('data-mail-to');element.removeAttribute('data-replace-inner');if(element.tagName==='A')element.setAttribute('href','mailto:'+mailTo);if(replaceInner==='true'||replaceInner===''){element.innerHTML=mailTo;return;}if(replaceInner)element.innerHTML=element.innerHTML.replace(replaceInner,mailTo);}if(clickable.length){Array.prototype.slice.call(elements).forEach(function(element){element.addEventListener('click',function(event){if(element.className.split(/\s+/).indexOf('link-processed')===-1){event.preventDefault();setMailAddress(element);element.classList.add('link-processed');}});});return;}NodeList.prototype.forEach=Array.prototype.forEach;elements.forEach(function(element){setMailAddress(element);});}Drupal.behaviors.obfuscateEmailField={attach:init};})(Drupal);;
(function($,Drupal,once){'use strict';Drupal.behaviors.ckeditorReadmore={attach:function(context,settings){once('ckeditor-readmore','.ckeditor-readmore',context).forEach(function(element){var togglerTag=element.dataset.readmoreType==='button'?'button':'a';var moreText=element.dataset.readmoreMoreText;var lessText=element.dataset.readmoreLessText;var classes=element.dataset.readmoreClasses;var wrapper=element.parentNode;if(!wrapper.classList.contains('ckeditor-readmore-wrapper')){wrapper=document.createElement('div');wrapper.classList.add('ckeditor-readmore-wrapper');element.parentNode.insertBefore(wrapper,element);wrapper.appendChild(element);}var toggler=document.createElement(togglerTag);toggler.classList.add('ckeditor-readmore-toggler');if(classes)classes.split(" ").forEach(function(item){toggler.classList.add(item);});toggler.innerText=moreText;if(togglerTag==='a')toggler.setAttribute('href','#');wrapper.appendChild(toggler);toggler.onclick=function(event){event.preventDefault();toggler.blur();toggler.classList.toggle('open');wrapper.classList.toggle('open');$(element).slideToggle();if(toggler.innerText.toLowerCase()===moreText.toLowerCase())toggler.innerText=lessText;else toggler.innerText=moreText;};});}};})(jQuery,Drupal,once);;
