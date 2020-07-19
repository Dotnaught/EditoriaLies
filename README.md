# Bloom Broom

A Chrome extension that automatically removes cookies and tracking data deposited by Bloomberg.com.

## Why?

Bloomberg.com limits non-subscribers to a few articles a month, after which it blocks access with a subscription banner. Many other news websites implement something similar through what's known as a soft paywall.

Soft paywalls, or metered paywalls, are what publishers use when the promotional value of limited article access – by maximizing online traffic and ad dollars derived from that – looks like it will generate more revenue than implementing a hard paywall and relying on subscription revenue from a reduced set of readers.

Soft paywalls deny access by adding files or data to your computer without your consent. Getting around them involves removing those files or data.

It's fairly easy to do so manually. You could use your browser's developer tools to clear cookies and local storage. In Chrome, this involves opening Chrome DevTools, visiting the Application tab and clicking the "Clear site data" button, for example.

But not everyone knows how to do this or wants to bother. Bloom Broom offers a way to automate this task.

There's also Incognito mode.

Google in 2020 [closed two loopholes](https://www.blog.google/outreach-initiatives/google-news-initiative/protecting-private-browsing-chrome/) in Chrome's Incognito mode that allowed news publishers to deter metered paywall circumvention.

## Subscriptions

You absolutely should subscribe to Bloomberg and other news sites, if you can afford to do so. News publishers need all the financial support they can get.

If you do pay for a Bloomberg subscription, you shouldn't use Bloom Broom as it will prevent login persistence.

But news publishers also have an obligation to respect their readers.

## Alternatives

Bloom Broom is about as minimal as an extension can get. It's basically two functions (which makes code security auditing really easy). If you're looking for a more extensive solution, try [Bypass Paywalls](https://github.com/iamadamdev/bypass-paywalls-chrome), which works on a wide variety of websites.

### Installing

Download Bloom Broom from GitHub.

In the Chrome omnibox, type:

```
chrome://extensions/
```

Ensure Developer mode is active. Click "Load unpacked," nagivate to the downloaded extension code and select.

From now on, Bloom Broom will run when you visit Bloomberg.com. That's all there is to it.

## Authors

- **Thomas Claburn** - [Dotnaught](https://github.com/Dotnaught)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
