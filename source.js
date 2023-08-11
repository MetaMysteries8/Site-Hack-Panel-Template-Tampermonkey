// ==UserScript==
// @name         Site Hack Panel Template
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Create a customizable site hack panel for quick actions.
// @author       You
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Add styles for overlays
    GM_addStyle(`
        .site-hack-panel {
            position: fixed;
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.5);
            padding: 10px;
            border-radius: 5px;
            user-select: none;
            cursor: move;
        }
    `);

    // Create custom overlay
    function createOverlay(className, content) {
        const overlay = document.createElement('div');
        overlay.className = className;

        const closeButton = document.createElement('span');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            document.body.removeChild(overlay);
        };

        overlay.appendChild(closeButton);
        overlay.appendChild(content);

        return overlay;
    }

    // Create buttons and their respective actions
    const buttons = [
        {
            label: 'Custom Action 1',
            action: function() {
                // Add your custom action code here
            }
        },
        {
            label: 'Custom Action 2',
            action: function() {
                // Add your custom action code here
            }
        },
        // Add more buttons as needed
    ];

    // Create main overlay
    const mainOverlay = document.createElement('div');
    mainOverlay.className = 'site-hack-panel';

    // Create and append buttons to main overlay
    for (const button of buttons) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = button.label;
        buttonElement.style.marginRight = '10px';
        buttonElement.onclick = button.action;
        mainOverlay.appendChild(buttonElement);
    }

    // Make main overlay movable
    let isDragging = false;
    let offsetX, offsetY;

    mainOverlay.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - mainOverlay.getBoundingClientRect().left;
        offsetY = e.clientY - mainOverlay.getBoundingClientRect().top;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            mainOverlay.style.left = e.clientX - offsetX + 'px';
            mainOverlay.style.top = e.clientY - offsetY + 'px';
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Append main overlay to body
    document.body.appendChild(mainOverlay);
})();
