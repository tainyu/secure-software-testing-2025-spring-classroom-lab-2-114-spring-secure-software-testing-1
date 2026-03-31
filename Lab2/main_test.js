const fs = require('fs');
const { Application, MailSystem } = require('./main');

describe('MailSystem', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('write should return correct mail content', () => {
        const mail = new MailSystem();
        const result = mail.write('Alice');
        expect(result).toBe('Congrats, Alice!');
    });

    test('send should return true when Math.random > 0.5', () => {
        const mail = new MailSystem();
        jest.spyOn(Math, 'random').mockReturnValue(0.9);

        const result = mail.send('Alice', 'Congrats, Alice!');
        expect(result).toBe(true);
    });

    test('send should return false when Math.random <= 0.5', () => {
        const mail = new MailSystem();
        jest.spyOn(Math, 'random').mockReturnValue(0.1);

        const result = mail.send('Alice', 'Congrats, Alice!');
        expect(result).toBe(false);
    });
});

describe('Application', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('getNames should read and parse names from file', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob\nCharlie');
        });

        const app = new Application();

        const [people, selected] = await app.getNames();
        expect(people).toEqual(['Alice', 'Bob', 'Charlie']);
        expect(selected).toEqual([]);
    });

    test('getRandomPerson should return a person based on mocked random index', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob\nCharlie');
        });

        const app = new Application();
        app.people = ['Alice', 'Bob', 'Charlie'];

        jest.spyOn(Math, 'random').mockReturnValue(0.4);
        const result = app.getRandomPerson();

        expect(result).toBe('Bob');
    });

    test('selectNextPerson should return null when all people are selected', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob');
        });

        const app = new Application();
        app.people = ['Alice', 'Bob'];
        app.selected = ['Alice', 'Bob'];

        const result = app.selectNextPerson();
        expect(result).toBeNull();
    });

    test('selectNextPerson should select a new person', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob\nCharlie');
        });

        const app = new Application();
        app.people = ['Alice', 'Bob', 'Charlie'];
        app.selected = [];

        jest.spyOn(app, 'getRandomPerson').mockReturnValue('Bob');

        const result = app.selectNextPerson();

        expect(result).toBe('Bob');
        expect(app.selected).toEqual(['Bob']);
    });

    test('selectNextPerson should retry when selected person is already chosen', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob\nCharlie');
        });

        const app = new Application();
        app.people = ['Alice', 'Bob', 'Charlie'];
        app.selected = ['Alice'];

        const spy = jest.spyOn(app, 'getRandomPerson');
        spy
            .mockReturnValueOnce('Alice')
            .mockReturnValueOnce('Charlie');

        const result = app.selectNextPerson();

        expect(result).toBe('Charlie');
        expect(app.selected).toEqual(['Alice', 'Charlie']);
        expect(spy).toHaveBeenCalledTimes(2);
    });

    test('notifySelected should call write and send for each selected person', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, 'Alice\nBob');
        });

        const app = new Application();
        app.selected = ['Alice', 'Bob'];

        const writeSpy = jest.spyOn(app.mailSystem, 'write');
        const sendSpy = jest.spyOn(app.mailSystem, 'send').mockReturnValue(true);

        app.notifySelected();

        expect(writeSpy).toHaveBeenCalledTimes(2);
        expect(writeSpy).toHaveBeenNthCalledWith(1, 'Alice');
        expect(writeSpy).toHaveBeenNthCalledWith(2, 'Bob');

        expect(sendSpy).toHaveBeenCalledTimes(2);
        expect(sendSpy).toHaveBeenNthCalledWith(1, 'Alice', 'Congrats, Alice!');
        expect(sendSpy).toHaveBeenNthCalledWith(2, 'Bob', 'Congrats, Bob!');
    });
});
