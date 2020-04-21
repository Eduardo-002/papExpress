set /p out=<commitN.txt
set /A n=%out:~0%
set /A i = 1
set /A nn = %n% + %i%
echo %nn%
@echo %nn% > commitN.txt

git init
git add ./
git commit -m "c%nn"
git remote add origin https://github.com/Eduardo-002/papExpress.git
git push -u origin master

pause