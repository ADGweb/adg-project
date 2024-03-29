# СТРУКТУРА, ПРАВИЛА, ИНСТРУКЦИИ

***
## СТРУКТУРА ПРОЕКТА

### templates
Шаблоны страниц находятся в директории templates. Название директории соответствует названию страницы.
Внутри лежит файл index.html с шаблоном самой страницы.

### bundle
Основная директория для сборки проекта. Точка входа для Webpack. В этой директории находятся папки, названия которых
соответствует названиям страниц. Внутри лежат файлы index.js, в которых описаны все зависимости для страниц.

### page-blocks (Сменить название)
В этой директории находятся папки (блоки), названия которых соответствует названиям страниц. Внутри лежат файлы-зависимости,
необходимые для корректного отображения/работы страниц.

### modules (Сменить название)
В этой директории находятся блоки, которые могут использоваться на разных страницах. modules ожидают определенную структуру
в templates. Примеры структур есть в README.md к каждому модулю.

### components
Полностью независимые блоки со своей структурой, логикой и стилями. Могут подключаться на любые страницы.

### assets
Ресурсы, активы, которые используются/переиспользуются в проекте (шрифты, логотипы, картинки и т.д.)
Для использования с JS и CSS (а также с их фраемворками и препроцессорами)

### static
assets/static, в этой директории находится статика, которая никак не обробатывается Webpack. При сборке просто
копируется в папку dist/assets.

***
## СТИЛИ

### разделение стилей
Стили описанные в файле с расширением .scss, во время сборки проекта, компилируются в .css и подключаются к шаблону.
Стили описанные в файле с расширением .css, после сборки проекта, передаются в `<style>` и вставляются в `<head>` страницы.

### правила
В файле rules.scss собраны все правила для стилей используемые в проекте. чтобы ими воспользоваться нужно импортировать
содержимое файла в ваш файл со стилями (в самом начале файла). Пример: `@import '@/rules/rules';`

***
## ГЛОБАЛЬНЫЕ СКРИПТЫ
В дирректории bundle находятся две особые точки входа для Webpack global и global_head - это глобальные скрипты, которые
подключаются ко всем страницам. Скрипты из global компилируются в отдельный bundle-файл и подключаются в `<body>`, скрипты из
global_head компилируются в отдельный bundle-файл и подключаются в `<head>`.

***
## ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ

### focus
Для всех интерактивных элементов необходимо подключать миксин focus-outline-dark или focus-outline-light в зависимости от того
на каком фоне они находятся.
