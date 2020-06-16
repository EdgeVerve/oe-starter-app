import '@polymer/polymer/lib/elements/dom-module.js';
const styleElement = document.createElement('dom-module');
styleElement.innerHTML =
  `<template>
<style>

    paper-menu a>*,
    paper-menu paper-item>*,
    paper-menu paper-icon-item>* {
        pointer-events: none;
    }
    /* General styles */
    
    body {
        @apply(--layout-fullbleed);
        @apply(--layout-vertical);
        font-family: Lato;
        font-size: 16px;
    }
     
    paper-button[primary] {
        background-color: #006BFF;
        color: #fff;
    }

    paper-button[teritary] {
        background-color: transparent;
        color: #006BFF;
    }

     :root {
        --success-text-color: #7ED321;
        --paper-toolbar-height: 56px;
        --paper-toolbar-background: #2196F3;
        --paper-dialog-background-color: #FFFFFF;
        --paper-listbox-background-color: #FFFFFF;

        --paper-toolbar-title: {
            pointer-events: all;
        }
        --paper-card: {
            background: #fff;
        }

        paper-scroll-header-panel {
            --paper-toolbar: {
                box-shadow: none;
                background: var(--default-background-color);
                color: #000;
            };
        }
       
        --paper-button: {
            font-size: 14px;
            padding: 8px;
            font-family: Lato;
            border-radius: 4px;
            text-transform: capitalize;
        }

        --paper-font-common-base {
            font-family: Lato, system-ui, sans-serif;
        }
    }

    oe-data-table {
        --oe-data-table-row-selected: {
            outline: none;
        };
        --oe-data-table: {
            font-family: Lato
        };
        --oe-data-table-data: {
          min-height: 36px;
        }
        --oe-data-table-column-header:{
          height: 46px;
        }
        --edit-control: {
          height: 36px;
        }
        --oe-data-table-row-action:{
          height: 36px;
        }
    }

    oe-info {
      --oe-info-label: {
        font-size: 12px;
        color : var(--primary-text-color);
        font-weight: regular;
      };

      --oe-info-value: {
        font-size: 14px;
        margin-bottom: 10px;
        color : var(--primary-text-color);
        font-weight: 600;
      };
    }







    ft-toggle,
    ft-buy-sell-toggle {
      padding-top: 10px;
    }
    /* END New Styles */

</style>
</template>`;
styleElement.register('shared-styles'); 
