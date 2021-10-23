#!/usr/bin/bash

rm -rf build
mkdir build
npx webpack build
cp public/example.css build/
cp public/example.html build/
cp public/styles.css build/
