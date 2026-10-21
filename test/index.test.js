const { capitalizeWords, filterActiveUsers, logAction } = require('../index');
describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('returns an empty string for empty input', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('capitalizes words separated by a hyphen', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('capitalizes a single word', () => {
        expect(capitalizeWords('javascript')).toBe('Javascript');
    });
});


describe('filterActiveUsers', () => {
    test('returns only active users', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
            { name: 'Charlie', isActive: true },
        ];

        const result = filterActiveUsers(users);

        expect(result).toEqual([
            { name: 'Alice', isActive: true },
            { name: 'Charlie', isActive: true },
        ]);
    });
    test('returns an empty array when all users are inactive', () => {
        const users = [
            { name: 'Alice', isActive: false },
            { name: 'Bob', isActive: false },
        ];

        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns an empty array when given no users', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});


describe('logAction', () => {
    test('generates the correct log message', () => {
        const fixedDate = new Date('2024-11-27T12:00:00.000Z');

        jest.useFakeTimers();
        jest.setSystemTime(fixedDate);

        try {
            const result = logAction('login', 'Alice');

            expect(result).toBe(
                'User Alice performed login at 2024-11-27T12:00:00.000Z'
            );
        } finally {
            jest.useRealTimers();
        }
    });

    test('handles missing action or username', () => {
        const missingAction = logAction(undefined, 'Alice');
        const missingUsername = logAction('login', undefined);

        expect(missingAction).toMatch(
            /^User Alice performed undefined at .+$/
        );

        expect(missingUsername).toMatch(
            /^User undefined performed login at .+$/
        );
    });

    
    test('handles empty strings as inputs', () => {
        const result = logAction('', '');

        expect(result).toMatch(
            /^User {2}performed {2}at .+$/
        );
    });

});
