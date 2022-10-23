#!/bin/bash
DB_NAME=auth DB_HOST=127.0.0.1 deno run --allow-env --allow-read --allow-write --allow-net "$(pwd)/index.ts"