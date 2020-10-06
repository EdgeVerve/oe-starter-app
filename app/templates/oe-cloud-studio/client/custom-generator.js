const pretty = require('pretty');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs')

/* var globalConfig = {
  'data-table': {
    tag: 'oe-data-table',
    attributes: {
      'hide-header': true
    }
  },
  'data-table-column': {
    tag: 'oe-data-table-column',
    attributes: {
      'read-only': true
    }
  },
  textInput: {
    tag: 'custom-oe-input'
  },
  combo: {
    tag: 'custom-oe-combo'
  },
  jsonInput: {
    tag: 'custom-oe-json-input'
  },
  button: {
    tag: 'paper-button'
  }
}; */

const globalConfig = {
  "hbox": {
    "tag": "oe-hbox"
  },
  "vbox": {
    "tag": "oe-vbox"
  },
  "field-set": {
    "tag": "ft-field-group"
  },
  "data-table": {
    "tag": "oe-data-table"
  },
  "data-table-column": {
    "tag": "oe-data-table-column"
  },
  "oe-info": {
    "tag": "oe-info"
  },
  "label": {
    "tag": "label"
  },
  "heading-1": {
    "tag": "h1"
  },
  "heading-2": {
    "tag": "h2"
  },
  "heading-3": {
    "tag": "h3"
  },
  "heading-4": {
    "tag": "h4"
  },
  "textInput": {
    "tag": "oe-input"
  },
  "numberInput": {
    "tag": "oe-decimal"
  },
  "textArea": {
    "tag": "oe-textarea"
  },
  "jsonInput": {
    "tag": "oe-json-input"
  },
  "combo": {
    "tag": "oe-combo",
    "transformAttr": function(attr){
        if(!attr.listdata && attr.list){
            attr.listdata = attr.list;
        }
        return attr;
    }
  },
  "date": {
    "tag": "oe-date"
  },
  "checkbox": {
    "tag": "oe-checkbox"
  },
  "toggle": {
    "tag": "oe-toggle"
  },
  "radiogroup": {
    "tag": "oe-radio-group",
    "transformAttr":  function(attr){
        if(!attr.listdata && attr.list){
            attr.listdata = attr.list;
        }
        return attr;
    }
  },
  "slider": {
    "tag": "paper-slider"
  },
  "button": {
    "tag": "paper-button"
  },
  "icon": {
    "tag": "iron-icon"
  },
  "chart":{
    "tag":"oe-chart"
  },
  "widget-container":{
    "tag":"oe-widget-container"
  }
}



function _getGuid() {
  return crypto.randomBytes(4).toString('hex');
}

/**
 * Generates HTML DOM text for the given array of items
 * @param {*} items array of designer generated node object
 * @param {String} modelAlias model for binding value attribute
 * @returns {string} generated DOM Text
 */
function generateDomForNodes(items, modelAlias) {
  var ret = '';
  if (items && Array.isArray(items)) {
    items.forEach((item, index, arr) => {
      ret += generateDOM(item, index, arr, modelAlias);
      ret += '\n';
    });
  }
  return ret;
}

function generateTableColumn(item) {
  if (item.attributes) {
    item.attributes.key = item.attributes.key || item.attributes['field-id'];
    delete item.attributes['field-id'];
  }
  return generateDOM(item);
}
/**
 * Generates HTML DOM text for the given item object
 * @param {*} item designer generated node object
 * @param {int} index position within siblings
 * @param {[*]} siblings all siblings including this element
 * @param {String} modelAlias model for binding value attribute
 * @returns {string} generated DOM Text
 */
function generateDOM(item, index, siblings, modelAlias) {
  var ret = '';
  if (!item || item.type === 'comment') return ret;

  item.children = item.children || [];
  item.attributes = item.attributes || {};
  let itemConfig = globalConfig[item.name];
  let tagName;
  if(item.attributes['component-name']){
      tagName = item.attributes['component-name'];
  }else{
      tagName = itemConfig ? itemConfig.tag : item.name;
  }
  let attributes = item.attributes;
  if(itemConfig && typeof itemConfig.transformAttr === "function"){
      attributes = itemConfig.transformAttr(item.attributes);
  }
  if (attributes['field-id']) {
    Object.keys(attributes).forEach(name => {
      if (typeof attributes[name] === 'string') {
        attributes[name] = attributes[name].replace(/@value/g, `[[${modelAlias}.${attributes['field-id']}]]`)
      }
    });
  }

  switch (item.name) {
    case 'data-table': {
      ret = `<div class="data-table-wrapper">
            <oe-data-table ${generateAttributes(attributes, modelAlias)}>
             ${item.children.map(generateTableColumn).join('\n')}
             </oe-data-table>
             </div>
             `;
      break;
    }
    case 'managed-list-view': {
      var childViewModelName = attributes && attributes['field-id'] ? attributes['field-id'] + _getGuid() : 'mlv' + _getGuid();
      ret = `<${tagName} ${generateAttributes(attributes, modelAlias, 'items')} selected-item={{${childViewModelName}}}>${item.children.map((v, i, a) => generateDOM(v, i, a, childViewModelName)).join('\n')}</${tagName}>`;
      break;
    }
    default: {
      // if (item.type === 'text') {
      //   return `${item.content || ''}`;
      // }
      if (!item.children) {
        console.log(JSON.stringify(item, null, 2));
      }
      ret = `<${tagName} ${generateAttributes(attributes, modelAlias)}>${attributes['text-content'] ? attributes['text-content'] : ''}${item.children ? item.children.map((v, i, a) => generateDOM(v, i, a, modelAlias)).join('\n') : ''}</${tagName}>`;
      /* If item has href attribute, wrap it inside <a href=>...</a> */
      if (tagName !== 'a' && attributes.href) {
        ret = `<a href="${attributes.href}">${ret}</a>`;
      }
    }
  }
  return ret;
}

/**
 * Generates attribute string for given dom-node.
 *
 * Merges global attributes for the given node and designer configured
 * parameters and returns the stringified parameters for use in HTML.
 * @param {object} item : dom-node generated in designer
 * @param {String} modelAlias: model for binding value attribute
 * @param {String} valueProperty: property to bind value attribute
 * @returns {String} generated attributes string
 */
function generateAttributes(attributes, modelAlias, valueProperty) {
  valueProperty = valueProperty || 'value';

  // var globalSettings = globalConfig[item.name] || {};
  // var attributes = Object.assign({}, globalSettings.attributes, item.attributes);

  var attrText = Object.entries(attributes).map(attr => {
    var name = attr[0];
    var value = attr[1];
    /* if value is true or 'true', only return the attribute name e.g. 'disabled' */
    /* if value is false or 'false', return empty string */
    if (value === true || value === 'true') {
      return `${name}`
    } else if (value === false || value === 'false') {
      return '';
    } else if ((name === 'disabled' || name === 'hidden' || name === 'required')) {
      /** disabled/hidden = true/false is covered above 
       * Any other value is treated as field-id expression
       * disabled='has_rank' is converted as disabled$=[[modelAlias.has_rank]]
       * hidden='!show_more' is converted as hidden$=[[!modelAlias.show_more]]
       */
      var negative = false;
      if(value && value.match(/^\[\[|\(\(|\{\{/)){
          return `${name}$=${value}`;
      }
      if (value && value[0] === '!') {
        negative = true;
        value = value.substr(1);
      }
      if (value.length > 0) {
        return `${name}$=[[${negative ? '!' : ''}${modelAlias}.${value}]]`
      } else {
        return `${name}`
      }
    } else if (name === 'text-content' || name === 'tooltip') {
      /* Ignore attributes that are specially handled*/
      return '';
    } else {
      return (value && value.indexOf('"') >= 0 ? `${name}='${value}'` : `${name}="${value}"`);
    }
  }).join(' ');

  /* If control contains field-id attribute, add value bindings */
  if (attributes['field-id']) {
    attrText += ` ${valueProperty}={{${modelAlias}.${attributes['field-id']}}}`;
  }
  return attrText;
}

/**
 * Looks up for sections in the given item and generates tabs
 * each-children
 * see if this is a scroll-section -> take name attribute
 * check for 'section-title' child -> take title attribute
 * generate <-> either of the one based on other, if missing.
 *
 * <vertical-tab  name="general">Main</vertical-tab>
 * @param {*} item the designer config object
 * @returns {String} generated tab-segments for each scroll section in item
 */
function generateTabs(item) {
  var ret = '';
  var tabs = [];
  if (item && item.children) {
    item.children.forEach(v => {
      if (v.name === 'scroll-section') {
        var tab = {
          name: v.attributes ? v.attributes.name : ''
        };
        if (v.children) {
          v.children.forEach(vc => {
            if (vc.name === 'section-title') {
              tab.text = vc.attributes ? vc.attributes.title : '';
            }
          });
        }

        if (tab.name && !tab.text) {
          tab.text = _capitalize(tab.name);
        } else if (tab.text && !tab.name) {
          tab.name = tab.text.toLowerCase().replace(/[\s]/gi, '-');
          v.attributes = v.attributes || {};
          v.attributes.name = tab.name;
        } else if (!v.name && !v.text) {
          tab.name = 'section-' + Math.floor(Math.random() * 100);
          v.attributes = v.attributes || {};
          v.attributes.name = tab.name;
        }
        tabs.push(tab);
      }
    });
  }
  ret = tabs.map(v => `<vertical-tab name="${v.name}">${v.text}</vertical-tab>`).join('\n');
  return ret;
}

/**
 * Joins an array of strings into a single string, prefixing each array item with provided prefix
 * @param {String[]} fields fields to be joined ['name','mnemonic']
 * @param {String} prefix prefix to be used 'e'
 * @returns {String} joined string 'e.name, e.mnemonic'
 */
function generateArray(fields, prefix) {
  prefix = prefix || '';
  return fields ? fields.map(item => prefix + item).join(',') : '';
}


function _capitalize(v) {
  if (!v) return '';
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function _getModuleProperties(moduleDef) {
  var retString = '/*generated properties */';

  moduleDef && moduleDef.properties && Object.keys(moduleDef.properties).forEach(property => {
    retString += ',\n' + property + ': ' + JSON.stringify(moduleDef.properties[property], null, 2);
  });
  return retString;
}

function _getModuleFunctions(moduleDef) {
  var retString = '/*generated functions */';

  moduleDef && Object.keys(moduleDef).filter(key => typeof moduleDef[key] === 'function')
    .forEach(key => {
      var funcDef = moduleDef[key];
      var funcStr = funcDef.toString();
      funcStr = funcStr.replace(/(\s*function\s*)/, '').trim();
      if (funcStr.startsWith(funcDef.name)) {
        funcStr = funcStr.replace(funcDef.name, '');
      }
      funcStr = key + funcStr;
      retString += '\n' + funcStr;
    });
  return retString;
}

function generateComponent(componentName, viewConfig, moduleDef, templateContent) {
  basename = componentName;
  moduleDef = moduleDef || {};
  let moduleStr = moduleDef.toString();
  if (!!moduleStr.match(/class[\s]([a-zA-Z0-9]+)/)) {
    let modKlassName = moduleStr.match(/class[\s]([a-zA-Z0-9]+)/)[1];
    moduleStr = moduleStr.replace(/class[\s]*([a-zA-Z0-9]+)[\s]*extends[\s]*Object/,function(fullFileName,klassName){
      return fullFileName.replace(/extends[\s]*Object/,'extends __ClassName__')
    });
  
    templateContent = templateContent.replace('window.customElements.metadefine(__ClassName__.is, __ClassName__);',`
    ${moduleStr}
    window.customElements.metadefine(${modKlassName}.is, ${modKlassName});
    `);
  }

  /* Additional Properties */
  if (typeof moduleDef.properties === 'function') {
    moduleDef.properties = moduleDef.properties();
  }
  moduleDef.properties = moduleDef.properties || {};

  /* Additional Observers */
  if (typeof moduleDef.observers === 'function') {
    moduleDef.observers = moduleDef.observers();
  }
  moduleDef.observers = moduleDef.observers || [];

  /* Additional Styles */
  if (typeof moduleDef.styles === 'function') {
    moduleDef.styles = moduleDef.styles();
  }
  moduleDef.styles = moduleDef.styles || [];

  function _interpolate(text, params) {
    const names = Object.keys(params);
    const vals = Object.values(params);

    // eslint-disable-next-line no-new-func
    return new Function(...names, `return \`${text}\`;`)(...vals);
  }

  function _evaluatorFunc(item) {
    var retVal = _interpolate(item, context);
    if (!retVal || retVal === 'undefined') {
      console.warn('Token ', item, 'evaluated as undefined');
    }

    return retVal;
  }


  /* Prepare viewConfig */
  var metadata = Object.assign({}, viewConfig.meta);
  metadata.componentName = metadata.componentName || basename;
  metadata.modelAlias = metadata.modelAlias || basename.split('-')[0];
  metadata.pageTitle = metadata.pageTitle || basename.split('-').map(_capitalize).join(' ');
  metadata.className = metadata.className || basename.split('-').map(_capitalize).join('');

  var dom = {
    slots: {},
    elements: []
  };
  viewConfig.dom.forEach(item => {
    if (item && item.attributes && item.attributes.slotname) {
      dom.slots[item.attributes.slotname] = item;
      delete item.attributes.slotname;
    } else {
      dom.elements.push[item];
    }
  });
  /* End Prepare viewConfig */


  var context = {
    metadata: metadata,
    dom: dom,
    generateArray: generateArray,
    generateTabs: generateTabs,
    generateDOM: generateDOM,
    generateDomForNodes: generateDomForNodes,
    generateTableColumn: generateTableColumn
  };
  /* Mark the start and end of html-template */
  templateContent = templateContent.replace(/`@escape/gi, '@escapeTick');
  templateContent = templateContent.replace(/@escape`/gi, '@escapeTick');

  /* tokenize the contents and evaluate */
  var tokens = templateContent.split('`').map(_evaluatorFunc);
  var textContent = tokens.join('');
  /* Remove the metadata definitions from generated output */
  textContent = textContent.replace(/META START[\s\S]*META END/gi, '');

  /* Format the html template */
  textContent = textContent.split('@escapeTick');

  textContent[1] = pretty(textContent[1]);
  textContent = textContent.join('`');

  // /* Restore html-template start and end with actual back-tick */
  // textContent = textContent.replace(/@escapeTick/gi, '`');
  /* Replace the class-name with actual class-name */
  textContent = textContent.replace(/__ClassName__/g, metadata.className);

  /* Inject any generated property */
  textContent = textContent.replace(/,[\s]*__Properties__[\s]*:[\s]*\{[\s]*\}/g, _getModuleProperties(moduleDef));

  /* Inject any generated function */
  textContent = textContent.replace(/__Functions__[\s]*\([\s]*\)[\s]*\{[\s]*\}/g, _getModuleFunctions(moduleDef));

  /* Inject any defined styles */
  textContent = textContent.replace(/[\s]*__Styles__[\s]*\{[\s]*\}/g, moduleDef.styles);

  /** Inject any defined observers : 
   * expects observer function to be defined with array containing 
   * __Observers__ as member.
   * */
  var observersText = '';
  if (moduleDef.observers && moduleDef.observers.length > 0) {
    observersText = `'${moduleDef.observers.join("','")}'`;
  }
  textContent = textContent.replace(/,[\s]*__Observers__[\s]*/g, observersText);
  textContent = textContent.replace(/[\s]*__Observers__[\s]*/g, observersText);


  /* Convert this['modelAlias'] -> this.modelAlias */
  var regex = new RegExp(`\\['${metadata.modelAlias}'\\]`, 'g');
  textContent = textContent.replace(regex, `.${metadata.modelAlias}`);

  /* Remove eslint-disable from top of the file */

  textContent = textContent.replace(/\/\* eslint-disable \*\//, '');
  return textContent;
}

module.exports = generateComponent;
