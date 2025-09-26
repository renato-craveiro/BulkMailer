#!/bin/sh

VAR_NAME="API_BASE_URL"
VAR_VALUE="http://172.23.3.43:4000"

# Choose shell
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
else
    SHELL_RC="$HOME/.bashrc"
fi

# Adds var if not existent
if ! grep -q "$VAR_NAME=" "$SHELL_RC"; then
    echo "export $VAR_NAME=\"$VAR_VALUE\"" >> "$SHELL_RC"
    echo "Var $VAR_NAME added in $SHELL_RC"
else
    echo "Var $VAR_NAME already exists in $SHELL_RC"
fi

# Updates current shell
export $VAR_NAME="$VAR_VALUE"

# Install deps and build
npm install
npm run build