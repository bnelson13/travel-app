import { linkCheck } from '../js/linkChecker'

// Test for a valid URL
describe('linkCheck used to validate URL', () => {
    test('Valid URL', () => {
        const testUrl = "https://www.udacity.com/";
        expect(linkCheck(testUrl)).toBe(true);
    });
});

//Test for an invalid URL
describe('linkCheck used to validate URL', () => {
    test('Invalid URL', () => {
        const testUrl = "htt..com/";
        expect(linkCheck(testUrl)).toBe(false);
    });
});