#!/bin/bash

set -e

jsx="$(which jsx)"

jsx --extension jsx ./react/ ./react/builds/

node build.js
