REM npm start
REM @pause

pm2 flush
pm2 start index.js -i 1