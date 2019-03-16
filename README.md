[![Maintainability](https://api.codeclimate.com/v1/badges/ccebb12ce251ce2df362/maintainability)](https://codeclimate.com/github/krav-ets/project-lvl3-s358/maintainability)
[![Build Status](https://travis-ci.org/krav-ets/project-lvl3-s358.svg?branch=master)](https://travis-ci.org/krav-ets/project-lvl3-s358)

# Project #3: Page loader


Основная задача этого проекта, показать общие принципы работы с асинхронным кодом в js.
Затрагиваемые темы:

* Тестирование с использованием Mock/Stub
* Активный файловый ввод/вывод
* Работа с ошибками и исключениями
* Знакомство с модулями `nodejs`: `os`, `path`, `fs`, `url`
* Работа с DOM. Базовые манипуляции
* Promises, Async/Await
* Работа с HTTP

### Описание

В рамках данного проекта необходимо реализовать утилиту для скачивания
указанного адреса из сети. Принцип ее работы очень похож на то, что делает браузер
при сохранении страниц сайтов.

Возможности утилиты:

* Можно указать папку, в которую нужно положить готовый файл
* Утилита скачивает все ресурсы указанные на странице и меняет страницу
  так, что начинает ссылаться на локальные версии

Пример использования:

```sh
$ page-loader --output /var/tmp https://hexlet.io/courses

✔ https://ru.hexlet.io/lessons.rss
✔ https://ru.hexlet.io/assets/application.css
✔ https://ru.hexlet.io/assets/favicon.ico
✔ https://ru.hexlet.io/assets/favicon-196x196.png
✔ https://ru.hexlet.io/assets/favicon-96x96.png
✔ https://ru.hexlet.io/assets/favicon-32x32.png
✔ https://ru.hexlet.io/assets/favicon-16x16.png
✔ https://ru.hexlet.io/assets/favicon-128.png

Page was downloaded as 'ru-hexlet-io-courses.html'
```


## Asciinema

[Пример работы](https://asciinema.org/a/QotGtoP7c8OHjbNbl3k7rudyB) 



## Installing

```bash
$ npm install page-loader-kravets
```

## Usage

```bash
$ page-loader-kravets --output <directory> <url>
```
