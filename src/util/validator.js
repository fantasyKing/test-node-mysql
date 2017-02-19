const _ = require('lodash');
const validator = require('validator');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// 检查必须的参数是否存在
function mustExists(must, vaule) {
  if (must && (vaule === undefined || vaule == null)) {
    return false;
  }
  return true;
}
function isNullNotZero(val) {
  if (val === undefined || val === '' || val === null) return true;
  return false;
}

// 检查参数类型是否正确，escapse字符串，将json转成对象
function isValidType(obj, attr, type) {
  let value = obj[attr];
  // if (!value) {
  //   return true;
  // }
  if (!Array.isArray(value) && !(toString.call(value) === '[object Object]')) {
    value = String(value); // validator参数必须为字符串
  }
  const trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  };
  const types = type.split(',');
  for (const type_value of types) {
    const _type = trim(type_value).toLowerCase();
    switch (_type) {
      case 'array':
        {
          if (Array.isArray(value)) {
            return true;
          }
          break;
        }
      case 'mongoid':
        {
          if (validator.isMongoId(value)) {
            return true;
          }
          break;
        }
      case 'date':
        {
          if (validator.isDate(value)) {
            return true;
          }
          break;
        }
      case 'phone':
        {
          if (validator.isMobilePhone(value, 'zh-CN')) {
            return true;
          }
          break;
        }
      case 'number':
        {
          if (validator.isNumeric(value)) {
            return true;
          }
          break;
        }
      case 'float':
        {
          if (validator.isFloat(value)) {
            return true;
          }
          break;
        }
      case 'decimal':
        {
          if (validator.isDecimal(value)) {
            return true;
          }
          break;
        }
      case 'email':
        {
          if (validator.isEmail(value.trim())) {
            return true;
          }
          break;
        }
      case 'file':
        {
          if (value) {
            return true;
          }
          break;
        }
      case 'json':
        {
          if (toString.call(value) === '[object Object]') {
            obj[attr] = value;
            return true;
          }
          if (toString.call(value) === '[object String]' && validator.isJSON(value)) {
            obj[attr] = JSON.parse(value);
            return true;
          }
          break;
        }
      default :
        {
          if (typeof value === _type) {
            return true;
          }
          break;
        }
    }
  }
  return false;
}

exports.checkParamType = function checkParamTypeFn(obj, attrs, musts, types) {
  const err = [];

  // 校验参数必须是不为空的数组
  if (!attrs || !musts || !types) {
    return err;
  }

  // 校验参数数组必须长度保持一致
  if (!(attrs.length === musts.length && attrs.length === types.length)) {
    err.push('attrs, musts and types length must be equivalent.');
    return err;
  }

  for (let i = 0; i < attrs.length; i++) {
    const _attr = attrs[i];
    const must = musts[i];
    const type = types[i];

    if (!mustExists(must, obj[_attr])) {
      err.push(`${_attr} is necessary`);
    }
    if (isNullNotZero(obj[_attr])) continue;
    if (!isValidType(obj, _attr, type)) {
      err.push(`${_attr} should be ${type}`);
    }
  }
  return err;
};

exports.e164 = function (phone, country_code) {
  try {
    const phoneNumber = phoneUtil.parse(String(phone), country_code || 'CN');
    const phoneNumberE164 = phoneUtil.format(phoneNumber, PNF.E164);
    logger.debug('phone.e164 =', `${phone} = ${phoneNumberE164}`);
    return phoneNumberE164;
  } catch (e) {
    logger.error({ err: e }, 'e164 error =');
    return '';
  }
};

exports.unescapse = function (str) {
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, '\'')
  .replace(/&#x2F;/g, '\/');
};

/**
 * 检查字符串长度
 * @param text
 * @param min
 * @param max
 * @param cb
 */
exports.textLengthCheck = function (text, min, max) {
  let err;

  if (!text) {
    err = null;
  } else {
    if (text.length < min) {
      err = `${text} minimum length is ${min}`;
    } else if (text.length > max) {
      err = `${text} maximum length is max`;
    } else {
      err = null;
    }
  }

  return err;
};
