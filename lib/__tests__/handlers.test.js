const handlers = require('../handlers');

test('home page renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe('home');
});

test('about page renders with fortune', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  // we expect the about page was only rendered once
  expect(res.render.mock.calls.length).toBe(1);
  // we expect the about page to be rendered
  // first index signifies the invocation
  // second index signifies position of argument
  expect(res.render.mock.calls[0][0]).toBe('about');
  // this render has a second argument, of a fortune which it passes along
  // we expect an object containing a key fortune
  // we expect that fortune to be a string of alphabetical characters and nothing else
  expect(res.render.mock.calls[0][1])
    .toEqual(expect.objectContaining(
      { fortune: expect.stringMatching(/\W/) },
    ));
});

test('404 handler renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 handler renders', () => {
  const err = new Error('server');
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('500');
});
