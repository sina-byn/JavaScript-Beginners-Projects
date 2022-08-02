const isPalindrome = (word) => {
    return word === word.split('').reverse().join('');
};

// __test__
const words = [
    'good',
    'kayak',
    'deified',
    'rotator',
    'bad',
    'wow',
    'null'
];

// expected result
// false
// true
// true
// true
// false
// true
// false

words.forEach(word => {
    console.log(isPalindrome(word));
});

// more readable version - extended version
const isPalindromeExtended = (word) => {
    // split the word into an array that consists of the characters that made up the given word
    const wordChars = word.split(''); // split('') => splits into characters

    // reverse the splittWord array using the array.reverse() method
    const reversedChars = wordChars.reverse();

    // create a new string which the reverse of the input string by using the join() method on the reversed array
    const reversedWord = reversedChars.join(''); // join('') => join characters with nothing in-between

    // return true if word is the same as the reversed word meaning that the input word is a palindrome
    if (word === reversedWord) {
        return true;
    }

    // if we don't make it in the if condition above it means that the input word is not a palindrome and we should return false
    return false;
}

// my github profile link ==> https://github.com/sina-byn