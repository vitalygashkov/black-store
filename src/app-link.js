const hasAppLink = (text) => text.includes('apps.apple.com') || text.includes('testflight.apple.com');

module.exports = { hasAppLink };
