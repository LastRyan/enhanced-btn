// ==UserScript==
// @name         Add Buttons to All Websites
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Adds a list of buttons to all websites with various functions and notifications
// @match		*://afdian.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.bottom = '10px';
    buttonContainer.style.right = '10px';
    buttonContainer.style.zIndex = '9999';
    buttonContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    buttonContainer.style.border = '1px solid #ccc';
    buttonContainer.style.borderRadius = '5px';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    buttonContainer.id = 'tampermonkey-button-container';

    // Function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.innerText = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '200px';
        notification.style.right = '10px';
        notification.style.backgroundColor = '#000';
        notification.style.color = '#fff';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Function to set controlsList="download" for all video elements
    function enableDownloadForVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('controlsList', 'download');
        });
        showNotification('controlsList="download" has been set for all video elements.');
    }

    // Function to find and copy the first magnet link on the page
    function copyMagnetLink() {
        const magnetLink = document.querySelector('a[href^="magnet:"]');
        if (magnetLink) {
            const link = magnetLink.getAttribute('href');
            navigator.clipboard.writeText(link).then(() => {
                showNotification('Magnet link copied to clipboard.');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        } else {
            showNotification('No magnet link found on this page.');
        }
    }

    // Function to reduce the brightness of the background
    function reduceBackgroundLight() {
        document.body.style.transition = 'background-color 0.5s';
        document.body.style.backgroundColor = 'rgb(64, 64, 64)';
        showNotification('Background light has been reduced.');
    }

    // scrool to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables smooth scrolling
        });
    }


    // List of button names and their actions
    const buttons = [
        { text: 'Top', action: scrollToTop },
        { text: 'Enable Download on Videos', action: enableDownloadForVideos },
        { text: 'Copy Magnet Link', action: copyMagnetLink },
        { text: 'Reduce Background Light', action: reduceBackgroundLight }
    ];

    // Function to create a button
    function createButton(text, action) {
        const button = document.createElement('button');
        button.innerText = text;
        button.style.margin = '5px';
        button.onclick = action;
        return button;
    }

    // Add buttons to the container
    buttons.forEach(btn => {
        const button = createButton(btn.text, btn.action);
        buttonContainer.appendChild(button);
    });

    // Append the container to the body
    document.body.appendChild(buttonContainer);
})();
