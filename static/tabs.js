document.addEventListener('DOMContentLoaded', function (event) {
    const addTabButton = document.getElementById('add-new-tab')
    const tabListElement = document.getElementById('tab-list-container')
    const iframeContainerElement = document.getElementById('iframe-container-area')
  
    let tabCount = 1
  
    addTabButton.addEventListener('click', () => {
        const newTabElement = document.createElement('li')
        const tabLabel = document.createElement('span')
        const newIframeElement = document.createElement('iframe')
  
        tabLabel.textContent = `New Tab`
        tabLabel.className = 'tab-label'
        newTabElement.dataset.tabId = tabCount
        newTabElement.addEventListener('click', switchToTab)
        newTabElement.setAttribute('draggable', true)
  
        const closeTabButton = document.createElement('button')
        closeTabButton.classList.add('close-tab-button')
        closeTabButton.innerHTML = '&#10005;'
  
        closeTabButton.addEventListener('click', (event) => {
            event.stopPropagation()
  
            const tabToRemove = tabListElement.querySelector(`[data-tab-id='${newTabElement.dataset.tabId}']`)
            const iframeToRemove = iframeContainerElement.querySelector(`[data-tab-id='${newTabElement.dataset.tabId}']`)
  
            if (tabToRemove && iframeToRemove) {
                const removedTabId = parseInt(tabToRemove.dataset.tabId)
                tabToRemove.remove()
                iframeToRemove.remove()
  
                const remainingTabs = Array.from(tabListElement.querySelectorAll('li'))
                if (remainingTabs.length > 0) {
                    let indexToActivate = remainingTabs.findIndex((tab) => parseInt(tab.dataset.tabId) > removedTabId)
                    if (indexToActivate === -1) {
                        indexToActivate = remainingTabs.length - 1
                    }
                    const nextTabToActivate = remainingTabs[indexToActivate]
                    const nextIframeToActivate = iframeContainerElement.querySelector(
                        `[data-tab-id='${nextTabToActivate.dataset.tabId}']`
                    )
  
                    if (nextTabToActivate && nextIframeToActivate) {
                        nextTabToActivate.classList.add('active')
                        nextIframeToActivate.classList.add('active')
                    }
                }
            }
        })
  
        newTabElement.appendChild(tabLabel)
        newTabElement.appendChild(closeTabButton)
        tabListElement.appendChild(newTabElement)
  
        const allTabs = Array.from(tabListElement.querySelectorAll('li'))
        allTabs.forEach((tab) => tab.classList.remove('active'))
        const allIframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
        allIframes.forEach((iframe) => iframe.classList.remove('active'))
  
        newTabElement.classList.add('active')
  
        newIframeElement.src = '/'
        newIframeElement.dataset.tabId = tabCount
        newIframeElement.classList.add('active')
        iframeContainerElement.appendChild(newIframeElement)
  
        // Epic title updating
        newIframeElement.addEventListener('load', () => {
            const title = newIframeElement.contentDocument.title
            tabLabel.textContent = title
        })
  
        tabCount++
    })
  
    window.addEventListener('message', function (event) {
        if (event.origin !== window.location.origin) {
            console.warn('Received message from unexpected origin:', event.origin)
            return
        }
  
        console.log('Received message:', event.data)
  
        if (event.data && event.data.url) {
            const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
        } else {
            console.log('No URL data in the message.')
        }
  
        const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
  
        if (activeIframe) {
            console.log('Visible iframe:', activeIframe)
  
            const tabToUpdate = tabListElement.querySelector(`[data-tab-id='${activeIframe.dataset.tabId}']`)
  
            if (tabToUpdate) {
                console.log('Tab to update:', tabToUpdate)
  
                const tabLabel = tabToUpdate.querySelector('.tab-label')
  
                if (tabLabel) {
                    console.log('Tab label:', tabLabel)
                    tabLabel.textContent = event.data.url
                    console.log('Hostname:', event.data.url)
                } else {
                    console.log('No tab label element found.')
                }
            } else {
                console.log('No tab to update found.')
            }
        } else {
            console.log('No visible iframe found.')
        }
    })
  
    function switchToTab(event) {
        const tabId = event.target.closest('li').dataset.tabId
  
        const allTabs = Array.from(tabListElement.querySelectorAll('li'))
        allTabs.forEach((tab) => tab.classList.remove('active'))
        const allIframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
        allIframes.forEach((iframe) => iframe.classList.remove('active'))
  
        const selectedTab = tabListElement.querySelector(`[data-tab-id='${tabId}']`)
        if (selectedTab) {
            selectedTab.classList.add('active')
        } else {
            console.log('No selected tab found with ID:', tabId)
        }
  
        const selectedIframe = iframeContainerElement.querySelector(`[data-tab-id='${tabId}']`)
        if (selectedIframe) {
            selectedIframe.classList.add('active')
        } else {
            console.log('No selected iframe found with ID:', tabId)
        }
    }
  
    let draggingTab = null
  
    tabListElement.addEventListener('dragstart', (event) => {
        draggingTab = event.target
    })
  
    tabListElement.addEventListener('dragover', (event) => {
        event.preventDefault()
        const targetTab = event.target
        if (targetTab.tagName === 'LI' && targetTab !== draggingTab) {
            const targetIndex = Array.from(tabListElement.children).indexOf(targetTab)
            const dragIndex = Array.from(tabListElement.children).indexOf(draggingTab)
            if (targetIndex < dragIndex) {
                tabListElement.insertBefore(draggingTab, targetTab)
            } else {
                tabListElement.insertBefore(draggingTab, targetTab.nextSibling)
            }
        }
    })
  
    tabListElement.addEventListener('dragend', () => {
        draggingTab = null
    })
})

function reloadIframe() {
    const iframeContainerElement = document.getElementById('iframe-container-area')
    const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
    const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
    activeIframe.src = activeIframe.src
}

function expandIframe() {
    const iframeContainerElement = document.getElementById('iframe-container-area')
    const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
    const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
    activeIframe.requestFullscreen()
}

function goBackInIframe() {
    const iframeContainerElement = document.getElementById('iframe-container-area')
    const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
    const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
    activeIframe.contentWindow.history.back()
}

function goForwardInIframe() {
    const iframeContainerElement = document.getElementById('iframe-container-area')
    const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
    const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
    activeIframe.contentWindow.history.forward()
}

function toggleEruda() {
    const iframeContainerElement = document.getElementById('iframe-container-area')
    const iframes = Array.from(iframeContainerElement.querySelectorAll('iframe'))
    const activeIframe = iframes.find((iframe) => iframe.classList.contains('active'))
  
    const erudaWindow = activeIframe.contentWindow
    const erudaDocument = activeIframe.contentDocument
  
    if (!erudaWindow || !erudaDocument) return
  
    if (erudaWindow.eruda?._isInit) {
        erudaWindow.eruda.destroy()
    } else {
        let scriptElement = erudaDocument.createElement('script')
        scriptElement.src = 'https://cdn.jsdelivr.net/npm/eruda'
        scriptElement.onload = function () {
            if (!erudaWindow) return
            erudaWindow.eruda.init()
            erudaWindow.eruda.show()
        }
        erudaWindow.document?.head?.appendChild(scriptElement) || erudaDocument.head.appendChild(scriptElement)
    }
}
// rip my brain cells :sob: