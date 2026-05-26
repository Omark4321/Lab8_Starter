# Lab8-Starter

Name: Omar Kurdi

Lab Partner: [partner name]

GitHub Pages URL: [to be added after deploy]

## How are graceful degradation and service workers related?

Graceful degradation basically means your site should still kind of work even when something breaks, like when the user loses their internet. Service workers help with that because once they're installed they cache the important files, so the next time you open the page the service worker can just hand back the cached version instead of trying to hit the network and failing. So even with no connection the recipes still show up instead of the page being blank or broken. It's not the full online experience but it degrades to something usable rather than nothing, which is pretty much the whole point of graceful degradation.
