import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import os from 'os';
import path from 'path';
import { promises as fsPromises } from 'fs';
import pageLoader from '../src';

axios.defaults.adapter = httpAdapter;

const host = 'https://hexlet.io';
const pathname = '/courses';
const pageUrl = `${host}${pathname}`;
const tmpDir = path.join(os.tmpdir(), 'hexlet-tmp-');

beforeAll(async () => {
  const originalPage = await fsPromises.readFile(path.join(__dirname, '__fixtures__/page.html'), 'utf8');

  nock(host).get(pathname).reply(200, originalPage);
  nock(host).get('/files/all-device.svg').replyWithFile(200, path.join(__dirname, '__fixtures__/files/all-device.svg'));
  nock(host).get('/files/style.css').replyWithFile(200, path.join(__dirname, '__fixtures__/files/style.css'));
  nock(host).get('/files/girl1.png').replyWithFile(200, path.join(__dirname, '__fixtures__/files/girl1.png'));
  nock(host).get('/files/ismobile.js').replyWithFile(200, path.join(__dirname, '__fixtures__/files/ismobile.js'));
});

it('#downloading resources', async () => {
  const dir = await fsPromises.mkdtemp(tmpDir);

  await pageLoader(pageUrl, dir);

  const page = await fsPromises.stat(path.join(dir, 'hexlet-io-courses.html'));
  const css = await fsPromises.stat(path.join(dir, 'hexlet-io-courses_files/files-style.css'));
  const svg = await fsPromises.stat(path.join(dir, 'hexlet-io-courses_files/files-all-device.svg'));
  const png = await fsPromises.stat(path.join(dir, 'hexlet-io-courses_files/files-girl1.png'));
  const js = await fsPromises.stat(path.join(dir, 'hexlet-io-courses_files/files-ismobile.js'));

  expect(page.isFile()).toBe(true);
  expect(js.isFile()).toBe(true);
  expect(png.isFile()).toBe(true);
  expect(svg.isFile()).toBe(true);
  expect(css.isFile()).toBe(true);
});
