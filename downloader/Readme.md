#Software problem

Write a program that can be used to download data from multiple sources and protocols to local disk.

The list of sources will be given as input in the form of urls (e.g. http://my.file.com/file, ftp://other.file.com/other, sftp://and.also.this/ending etc)

The program should download all the sources, to a configurable location (file name should be uniquely determined from the url) and then exit.

in your code, please consider:

The program should extensible to support different protocols
Some sources might very big (more than memory)
Some sources might be very slow, while others might be fast
Some sources might fail in the middle of download
We don't want to have partial data in the final location in any case.
Please also include tests (unit tests, integration tests)
Note that this is an exercise in Software development, so small details do matter



##Prerequisites

node v5.6.0

##Installing

Extract out zip to a folder {downloader}
cd downloader/
npm install


##Running the Downloader

###Download one file

```
node app.js -l {source}
```
sample: 
```
node app.js -l https://static.pexels.com/photos/36487/above-adventure-aerial-air.jpg
```

###Download more than one file

```
node app.js -l {source1}, {source2}
```
sample:
```
node app.js -l https://static.pexels.com/photos/36487/above-adventure-aerial-air.jpg ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt
```

###download from source file containing list of all source

```
node app.js --src {absolute path for json source file}
```
sample:
```
node app.js --src "sources.json"
```

##Running the tests
```
npm test
```

##Get Usage
```
node app.js -help
```


PS: .env file contain configurable location for download directory .Make sure that this directory is exist and has sufficient
write permission. Otherwise you can run above commands using sudo .


