const label = '%cVGM';

const bgColorMaps = {
  error: '#df4449',
  warn: '#beab28',
  info: '#277fdf',
  success: '#2dbe5f',
  debug: '#b9a9b5',
};

const labelStyle = [
  'background: #DFC35E',
  'color: white',
  'padding: 2px 4px',
  'border-radius: 3px',
  'font-weight: bold',
];

class Logger {
  constructor() {
    return new Proxy(this, {
      get: Logger.__get,
    });
  }

  static __get(target, prop) {
    const allowedMethods = Object.keys(bgColorMaps);
    const normalizedProp = prop === 'log' ? 'debug' : prop;

    if (allowedMethods.includes(normalizedProp)) {
      return (...args) => target.log(normalizedProp, ...args);
    }

    if (Reflect.has(target, normalizedProp)) {
      return Reflect.get(target, normalizedProp);
    }

    return undefined;
  }

  static getStyling(tag = 'debug') {
    const bgColor = bgColorMaps[tag] || bgColorMaps.debug;

    return [
      labelStyle.join(';'),
      `color: ${bgColor};margin-left: 7px`,
    ];
  }

  log(tag = 'debug', ...args) {
    const getFormattingArgs = Logger.getStyling(tag);

    const loggerMaps = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      success: console.log,
      debug: console.log,
    };

    const logger = loggerMaps[tag] || loggerMaps.success;

    logger.apply(this, [
      `${label}%c${args.join(' ')}`,
      ...getFormattingArgs,
    ]);
  }
}

export default new Logger();
