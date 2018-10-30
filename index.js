/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Concerto Tools module.
 * @module concerto-tools
 */

module.exports.CodeGen = require('./lib/codegen/codegen.js');
module.exports.Writer = require('./lib/codegen/writer.js');
module.exports.FileWriter = require('./lib/codegen/filewriter.js');
module.exports.version = require('./package.json');
