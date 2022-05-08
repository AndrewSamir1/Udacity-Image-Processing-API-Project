# Image Processing API

## Description

Building an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## How to run the app

Kindly run these commands in order to use the app correctly

### Install Dependencies

npm i

### Build Project

npm run build

### Run ESLint

npm run lint

### Run Prettier

npm run prettier

### Run Jasmine

npm run jasmine

### Build & Run Jasmine

npm run test

### Run The Project

npm run start

## Endpoint to resize images

http://localhost:3000/api/resize

## Valid Inputs

### Expected File Name Input

Coffee
Oranges

### Expected height & width input

> 0

### Example

http://localhost:3000/api/resize?n=Coffee&w=600&h=600
