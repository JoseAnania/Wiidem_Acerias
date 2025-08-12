@echo off
REM ==== Configurar JAVA_HOME temporalmente para Java 17 ====
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

echo Usando Java en: %JAVA_HOME%
java -version

REM ==== Ir a la carpeta android y compilar APK Debug ====
cd android
.\gradlew.bat assembleDebug

pause
