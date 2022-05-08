import supertest from 'supertest';
import path from 'path';
import { promises as fs } from 'fs';
import app from '../index';
import { checkFilename } from '../myfunctions';
import { checkWidth } from '../myfunctions';
import { checkHeight } from '../myfunctions';
import { resize } from '../myfunctions';
import { checkCache } from '../myfunctions';
import { getresizedImageLocation } from '../myfunctions';

const req = supertest(app);

it('raises an error if filename missing', async (): Promise<void> => {
  const e = await checkFilename({
    n: '',
    w: '600',
    h: '600',
  });
  expect(e).not.toBeNull();
});

it('raises an error if width is negative', async (): Promise<void> => {
  const e = await checkWidth({
    n: 'andrew',
    w: '-10',
    h: '600',
  });
  expect(e).not.toBeNull();
});

it('raises an error if height is negative', async (): Promise<void> => {
  const e = await checkHeight({
    n: 'andrew',
    w: '600',
    h: '-100',
  });
  expect(e).not.toBeNull();
});

it('raises an error if there is input parameter error', async (): Promise<void> => {
  const e = await resize({
    n: '',
    w: '600',
    h: '600',
  });
  expect(e).not.toBeNull();
});

it('returns 200', async (): Promise<void> => {
  const res = await req.get('/');

  expect(res.status).toBe(200);
});

it('returns 404', async (): Promise<void> => {
  const res = await req.get('/andrew');

  expect(res.status).toBe(404);
});

it('gets endpoint with valid arguments', async (): Promise<void> => {
  const res: supertest.Response = await req.get(
    '/api/resize?n=Coffee&w=600&h=600'
  );

  expect(res.status).toBe(200);
});

//delete file created for testing after tests end
afterAll(async (): Promise<void> => {
  const i = {
    n: 'Coffee',
    w: '600',
    h: '600',
  };
  const testedImageLocation = await getresizedImageLocation(i);

  await fs.access(testedImageLocation);
  fs.unlink(testedImageLocation);
});
//
