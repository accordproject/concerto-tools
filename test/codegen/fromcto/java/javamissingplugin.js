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

const chai = require('chai');
chai.should();
const sinon = require('sinon');

const JavaVisitor = require('../../../../lib/codegen/fromcto/java/javavisitor.js');
const AbstractPlugin = require('../../../../lib/codegen/abstractplugin.js');

const ClassDeclaration = require('composer-concerto').ClassDeclaration;
const EnumDeclaration = require('composer-concerto').EnumDeclaration;
const fileWriter = require('composer-concerto').FileWriter;

describe('JavaMissingPlugin', function () {
    let javaVisit;
    let mockFileWriter;
    beforeEach(() => {
        javaVisit = new JavaVisitor();
        javaVisit.plugin = new AbstractPlugin();
        mockFileWriter = sinon.createStubInstance(fileWriter);
    });

    describe('startClassFile', () => {
        it('should fail to write a java class file header', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockClass = sinon.createStubInstance(ClassDeclaration);
            mockClass.getModelFile.returns({
                getNamespace: () => {
                    return 'org.acme.people';
                },
                getName: () => {
                    return 'Bob';
                }
            });

            (function () { javaVisit.startClassFile(mockClass, param); }).should.throw('addClassImport not implemented in default plugin');

        });
    });

    describe('visitEnumDeclaration', () => {
        it('should fail to write an enum declaration and call accept on each property', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockEnumDeclaration = sinon.createStubInstance(EnumDeclaration);
            mockEnumDeclaration.getName.returns('Bob');
            mockEnumDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            sinon.stub(javaVisit, 'startClassFile');
            sinon.stub(javaVisit, 'endClassFile');

            (function () { javaVisit.visitEnumDeclaration(mockEnumDeclaration, param); }).should.throw('addEnumAnnotations not implemented in default plugin');
        });
    });

    describe('visitClassDeclaration', () => {
        let acceptSpy;
        let param;
        let mockClassDeclaration;
        beforeEach(() => {
            acceptSpy = sinon.spy();

            param = {
                fileWriter: mockFileWriter
            };

            mockClassDeclaration = sinon.createStubInstance(ClassDeclaration);
            mockClassDeclaration.getName.returns('Bob');
            mockClassDeclaration.getModelFile.returns({
                getImports: () => {
                    return ['oranges', 'apples'];
                }
            });
            mockClassDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockClassDeclaration.isConcept.returns(false);
            mockClassDeclaration.isAbstract.returns(false);
            mockClassDeclaration.isSystemCoreType.returns(false);
            mockClassDeclaration.getSuperType.returns(false);
            mockClassDeclaration.getIdentifierFieldName.returns(false);

            sinon.stub(javaVisit, 'startClassFile');
            sinon.stub(javaVisit, 'endClassFile');
        });

        it('should fail to write a class declaration and call accept on each property', () => {
            (function () { javaVisit.visitClassDeclaration(mockClassDeclaration, param); }).should.throw('addClassAnnotations not implemented in default plugin');
        });

        it('should fail to write additional class declaration methods', () => {
            (function () { javaVisit.plugin.addClassMethods(mockClassDeclaration, param); }).should.throw('addClassMethods not implemented in default plugin');
        });
    });

});