process.env.NODE_ENV = 'test';
import FileReader from 'filereader';

global.FileReader = FileReader;
