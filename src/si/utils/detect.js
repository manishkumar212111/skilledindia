
var vendor = typeof window != 'undefined' && 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';

const detect = {
    
    userAgent: "",
    init: function(ua){
        this.userAgent = ua;
    },
    isSafari: function() {
        return /safari/i.test(this.userAgent) && /apple computer/i.test(vendor);
    },
    isIphone: function() {
        return /iphone/i.test(this.userAgent) && !detect.isWindows();
    },
    isIpad: function() {
        return /ipad/i.test(this.userAgent) && !detect.isWindows();
    },
    isIpod: function() {
        return /ipod/i.test(this.userAgent) && !detect.isWindows();
    },
    isAndroid: function() {
        return /android/i.test(this.userAgent) && !detect.isWindows();
    },
    isAndroidPhone: function() {
        return detect.isAndroid() && /mobile/i.test(this.userAgent);
    },
    isAndroidTablet: function() {
        return /android/i.test(this.userAgent) && !/mobile/i.test(this.userAgent);
    },
    isBlackberry: function() {
        return /blackberry/i.test(this.userAgent) || /BB10/i.test(this.userAgent);
    },
    isDesktop: function() {
        return !detect.isMobile() && !detect.isTablet();
    },
    
    isWindows: function() {
        return /win/i.test(this.userAgent);
    },
    isWindowsPhone: function() {
        return detect.isWindows() && /phone/i.test(this.userAgent);
    },
    isWindowsTablet: function() {
        return detect.isWindows() && !detect.isWindowsPhone() && /touch/i.test(this.userAgent);
    },
    isMobile: function(ua) {        
        if (this.userAgent !== undefined && this.userAgent !== '') {
            ua = this.userAgent;
        }
        
        if (ua === undefined && typeof window !== 'undefined') {
            ua = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        }

        this.userAgent = ua;
        return detect.isIphone() || detect.isIpod() || detect.isAndroidPhone() || detect.isBlackberry() || detect.isWindowsPhone();
    },
    isTablet: function() {
        return detect.isIpad() || detect.isAndroidTablet() || detect.isWindowsTablet();
    },


};

export default detect;