import '@polymer/polymer/lib/elements/dom-module.js';
const styleElement = document.createElement('dom-module');
styleElement.innerHTML = 
`<template>
  <style>
  :root {
    --dark-primary-color:       #0288D1;
    --default-primary-color:    #03A9F4;
    --light-primary-color:      #B3E5FC;
    --text-primary-color:       #FFFFFF;
    --accent-color:             #FF4081;
    --primary-background-color: #F5F5F5;
    --primary-text-color:       #212121;
    --secondary-text-color:     #757575;
    --disabled-text-color:      #BDBDBD;
    --divider-color:            #BDBDBD;
    --primary-label-color:      #435f9e;


    /* Components */

    /* paper-drawer-panel */
    --drawer-menu-color:           #ffffff;
    --drawer-border-color:         1px solid #ccc;
    --drawer-toolbar-border-color: 1px solid rgba(0, 0, 0, 0.22);

    /* paper-menu */
    --paper-menu-background-color: #fff;
    --menu-link-color:             #111111;

    /* paper-input */
    --paper-input-container-color: var(--secondary-text-color);
    --paper-input-container-input-color: var(--secondary-text-color);
    --paper-input-container-focus-color: var(--default-primary-color);
    --paper-dialog-background-color: var(--default-background-color);
  }
  </style>
</template>`;
styleElement.register('app-theme');
