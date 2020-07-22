
import '@polymer/polymer/lib/elements/dom-module.js';
const styleElement = document.createElement('dom-module');
styleElement.innerHTML =
  `<template>
    <style>
      :root {
        --primary-color: #039BE5;
        --dark-primary-color: #1724BA;
        --light-primary-color: #1273F0;
        --accent-color: #039BE5;
        --default-primary-color: #039BE5;
        --dark-primary-color: #01579b;
        --white-color: #ffffff;
        --primaty-header-color: #039BE5;
      
        --primary-background-color: #F5F5F5;
        --secondary-background-color: #F9F9F9;
        --primary-text-color: #2D2D2D;
        --secondary-text-color: #727272;
        --disabled-text-color: #BDBDBD;
        --error-color: var(--paper-deep-orange-a700);
        --divider-color: rgba(0, 0, 0, 0.12);
        --default-text-color: #FFF;
        --default-background-color: #fff;
        --paper-dialog-background-color: #ffffff;
        --paper-menu-background-color: #fff;
        --paper-tabs-selection-bar-color: #2D2D2D;

        --ft-buy-color: var(--paper-red-500);
        --ft-sell-color: var(--paper-blue-500);
        --primary-label-color:      #435f9e;

        --app-toolbar-font-size: 16px;
        --app-toolbar-background-color: var(--primary-color);

        --paper-font-common-base {
          font-family: Lato, system-ui, sans-serif;
        };

        --paper-item: {
          background-color: #fff;
        }
        ;

        --paper-button: {
          text-transform: none;
        }
        ;

        --app-drawer-content-container: {
          background-color: #FFF;
        }
        ;
      }

      .fttitle {
        @apply --paper-font-common-base;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
      .flex-5 {
        @apply --layout-flex-5;
        } 

      .ftlabel {
        @apply --paper-font-subhead;
      }

      .margin-left {
        margin-left: 16px;
      }

      .fields {
        margin-left: 16px;
        @apply --layout-flex;
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      .fields>* {
        min-width: 300px;
        max-width: 550px;
        @apply --layout-flex;
        margin-right: 16px;
      }

      .checkbox-fields {
        margin-left: 16px;
        @apply --layout-flex;
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      .checkbox-fields>* {
        min-width: 180px;
        max-width: 400px;
        margin-right: 16px;
      }

      .fields>paper-button {
        margin-top: 8px;
        margin-bottom: 8px;
        min-width: 80px;
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      }

      .menubar>paper-button:hover {
        background-color: var(--paper-indigo-100);
      }

      .section-title {
        margin-left: 16px;
        color: var(--primary-color);
        margin-top: 24px;
      }

      .outer {
        /* width: 100vw; */
        height: calc(100vh - 64px);
        overflow-y: none;
      }

      .pagecontent {
        overflow-y: auto;
        height: calc(100vh - 136px);
      }

      .form-header {
        position: absolute;
        top: 64px;
        background-color: var(--primary-color);
        z-index: 1;
        width: 100%;
      }

      .form-content {
        margin-top: 64px;
      }

      oe-combo {
        --iron-icon-width: 20px;
        --iron-icon-height: 20px;
      }

      :root {
        --paper-font-caption: {
          @apply --paper-font-common-base;
          @apply --paper-font-common-nowrap;

          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.011em;
          line-height: 16px;
        }
        ;

        --paper-font-subhead: {
          @apply --paper-font-common-base;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
        ;
     }

      .header-search {
        --paper-input-container-input: {
          border: 1px solid var(--secondary-text-color);
          border-radius: 4px;
          padding: 12px 8px 4px 8px;
          box-sizing: border-box;
        }
        --paper-input-container-input-focus: {
          border-bottom-color: var(--primary-color);
        }
        --paper-input-container-input-invalid: {
          border-bottom-color: var(--error-color);
        }
        --paper-input-container-label: {
          top: 12px;
          left: 8px;
        }
        --paper-input-container-label-floating: {
          z-index: 2;
          top: 10px;
          display: flex;
        }
        --paper-input-container-underline: {
          display: none;
        }
        --paper-input-container-underline-focus: {
          display: none;
        }
      }

      .custom-input ::slot label oe-i18n-msg,
      .custom-input ::slot label span {
        background: #FFF;
        padding: 0px 4px;
      }

      /* box sizing border-box then height,width includes padding. */

      .grid-header {
        height: 64px;
        padding: 0 14px 0 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.16);
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-justified;
        margin-bottom: 3px;
      }

      .page-header {
        height: 64px;
        padding: 0 14px 0 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0 0;
        margin-bottom: 4px;
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-justified;
      }

     .page-title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.87);
        font-weight: 400;
        font-style: normal;
      }

      .value-wrapper {
        box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.16);
        margin: 16px 0px;
      }

      .pagecontent {
        overflow-y: auto;
        height: calc(100vh - 136px);
      }

      paper-button[primary] {
        color: white;
        background-color: var(--light-primary-color);
      }
      
      .flex-2 {
        @apply --layout-flex-2;
      }
      .flex-3 {
        @apply --layout-flex-3;
      }
      .flex-4 {
        @apply --layout-flex-4;
    }
    </style>
  </template>`;
styleElement.register('ft-shared-styles');


