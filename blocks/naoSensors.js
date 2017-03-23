/**
 * @fileoverview Sensor blocks for NAO.
 * @requires Blockly.Blocks
 * @author Janis
 */

'use strict';

goog.provide('Blockly.Blocks.naoSensors');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['naoSensors_getSample'] = {
	    /**
	     * Get the current reading from chosen sensor.
	     *
	     * @constructs naoSensors_getSample
	     * @this.Blockly.Block
	     * @param {String/dropdown}
	     * @returns immediately
	     * @returns {Number}
	     * @memberof Block
	     */
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var position = new Blockly.FieldDropdown([ 
	        	[ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], 
	        	[ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ],
	        	[Blockly.Msg.NAO_HEADSENSOR, 'HEAD']
	        ]);
	        var touchside = new Blockly.FieldDropdown([ 
	        	[Blockly.Msg.MOTOR_LEFT, 'LEFT'], 
	        	[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'],
	        	[Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT'],
	        	[Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE'],
	        	[Blockly.Msg.NAO_TOUCH_REAR, 'REAR']
	        ]);
	        var sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOUCH, 'NAO_TOUCHSENSOR' ],
	                [ Blockly.Msg.NAO_DETECTFACE, 'NAO_DETECTFACE' ], [ Blockly.Msg.NAO_NAOMARK, 'NAO_NAOMARK' ], [ Blockly.Msg.SENSOR_SONAR, 'NAO_SONAR' ],
	                [ Blockly.Msg.NAO_GYROMETER, 'NAO_GYROMETER' ], [ Blockly.Msg.NAO_ACCELEROMETER, 'NAO_ACCELEROMETER' ], [ Blockly.Msg.NAO_FSR, 'NAO_FSR' ], [ Blockly.Msg.NAO_PHRASE, 'NAO_Phrase' ] ], function(option) {
	            if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
	                this.sourceBlock_.updateShape_(option);
	            }
	        });
	        //this.workspace.device === 'nao'
	        this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE').appendField(position, 'POSITION').appendField(touchside, 'SIDE');
	        this.setOutput(true, 'Boolean');
	        this.sensorType_ = 'NAO_TOUCHSENSOR';
	        this.setTooltip(Blockly.Msg.GETSAMPLE_TOOLTIP);
	        this.setMovable(false);
	        this.setDeletable(false);
	        //this.updateShape_(this.sensorType_);
	    },
	    /**
	     * Create XML to represent whether the sensor type has changed.
	     *
	     * @return {Element} XML storage element.
	     * @this Blockly.Block
	     */
	    mutationToDom : function() {
	        var container = document.createElement('mutation');
	        container.setAttribute('input', this.sensorType_);
	        return container;
	    },
	    /**
	     * Parse XML to restore the sensor type.
	     *
	     * @param {!Element}
	     *            xmlElement XML storage element.
	     * @this Blockly.Block
	     */
	    domToMutation : function(xmlElement) {
	        var input = xmlElement.getAttribute('input');
	        this.sensorType_ = input;
	        this.updateShape_(this.sensorType_);
	    },

	    /**
	     * Called whenever anything on the workspace changes.
	     *
	     * @this Blockly.Block
	     */
	    /*
	     * onchange : function() { if (!this.workspace) { // Block has been deleted.
	     * return; } else if (this.update) this.updateShape_(); },
	     */
	    /**
	     * Called whenever the shape has to change.
	     *
	     * @this Blockly.Block
	     */
	    updateShape_ : function(option) {
	        this.sensorType_ = option;
	        var position = new Blockly.FieldDropdown([ 
	        	[ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], 
	        	[ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ],
	        	[Blockly.Msg.NAO_HEADSENSOR, 'HEAD']
	        ]);
	        var touchside = new Blockly.FieldDropdown([ 
	        	[Blockly.Msg.MOTOR_LEFT, 'LEFT'], 
	        	[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'],
	        	[Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT'],
	        	[Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE'],
	        	[Blockly.Msg.NAO_TOUCH_REAR, 'REAR']
	        ]);
	        var gyrocoord = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
	        var accelcoord = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ], [ 'Z', 'Z' ] ]);
	        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);

	        var input = this.getInput('DROPDOWN');
	        var toRemove = [];
	        for (var i = 0, field; field = input.fieldRow[i]; i++) {
	            if (field.name === 'SENSORTYPE' || field.name === 'GET') {
	                continue;
	            }
	            toRemove.push(field.name);
	        }
	        for (var j = 0; j < toRemove.length; j++) {
	            input.removeField(toRemove[j]);
	        }
	        if (this.sensorType_ == 'NAO_DETECTFACE') {
	            this.appendValue_('BOOL');
	            this.setOutput(true, 'Boolean');
	        } else if (this.sensorType_ == 'NAO_NAOMARK') {
	            this.appendValue_('BOOL');
	            this.setOutput(true, 'Boolean');
	        } else if (this.sensorType_ == 'SENSOR_SONAR') {
	            this.appendValue_('NUM_REV', 30);
	            this.setOutput(true, 'Number');
	        } else if (this.sensorType_ == 'NAO_GYROMETER') {
	            input.appendField(gyrocoord, 'COORDINATE');
	            this.appendValue_('NUM_REV', 1);
	            this.setOutput(true, 'Number');
	        } else if (this.sensorType_ == 'NAO_ACCELEROMETER') {
	            input.appendField(accelcoord, 'COORDINATE');
	            this.appendValue_('NUM_REV', 1);
	            this.setOutput(true, 'Number');
	        } else if (this.sensorType_ == 'NAO_FSR') {
	            input.appendField(side, 'SIDE');
	            this.appendValue_('NUM_REV', 2);
	            this.setOutput(true, 'Number');
	        }  else if (this.sensorType_ == 'NAO_TOUCHSENSOR') {
	            input.appendField(position, 'POSITION').appendField(touchside, 'SIDE');
	            this.appendValue_('BOOL');
	            this.setOutput(true, 'Boolean');
	        } else if (this.sensorType_ == 'NAO_Phrase') {
	        	input.appendField(new Blockly.FieldTextInput('Word1; Word2; Word3'),'DICTIONARY');
            	this.appendValue_('BOOL');
            	this.setOutput(true, 'Boolean');
	        }
	        // sensorType.setValue(this.sensorType_);
	    },

	    /**
	     * Called whenever the blocks shape has changed.
	     *
	     * @this Blockly.Block
	     */
	    appendValue_ : function(type, value) {
	        value = value || 30;
	        var logComp = this.getParent();
	        if (logComp && logComp.type != 'logic_compare')
	            logComp = null;
	        if (logComp) {
	            // change inputs, if block is in logic_compare and not rebuild from mutation.
	            if (logComp.getInputTargetBlock('B')) {
	                logComp.getInputTargetBlock('B').dispose();
	            }
	            var block = null;
	            logComp.updateShape(type);
	            if (type == 'NUM' || type == 'NUM_REV') {
	                block = this.workspace.newBlock('math_number');
	                block.setFieldValue(value.toString(), 'NUM');
	            } else if (type == 'BOOL') {
	                block = this.workspace.newBlock('logic_boolean');
	            } else if (type == 'TEXT') {
	            	block = this.workspace.newBlock('text');
	            	block.setFieldValue(value, 'TEXT');
	            }
	            block.initSvg();
	            block.render();
	            if (!logComp.inTask) {
	                block.setInTask(false);
	            }
	            var valueB = logComp.getInput('B');
	            valueB.connection.connect(block.outputConnection);
	        }
	    }
};

Blockly.Blocks['naoSensors_dialog'] = {
	    /**
	     * Tries to recognize a phrase and says the answer on success.
	     *
	     * @constructs naoActions_dialog
	     * @this.Blockly.Block
	     * @param {String}
	     *            PHRASE Phrase that is recognized
	     *            ANSWER NAOs answer
	     * @returns immediately
	     * @memberof Block
	     */
	    init : function() {
	        this.setColour(Blockly.CAT_ACTION_RGB);
	        this.appendValueInput('PHRASE').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_PHRASE);
	        this.appendValueInput('ANSWER').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_ANSWER);
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	        this.setTooltip(Blockly.Msg.NAO_DIALOG_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_recognizeWord'] = {
	    /**
	     * Returns last recognized word.
	     *
	     * @constructs naoActions_recognizeWord
	     * @this.Blockly.Block
	     * @param {String}
	     *            PHRASE Phrase that is recognized
	     * @returns immediately
	     * @memberof Block
	     */
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_RECOGNIZEDWORD);
		this.setOutput(true, 'String');
	        this.setTooltip(Blockly.Msg.NAO_RECOGNIZEWORD_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_touchsensors'] = {
	    /**
	     * Get the current reading from one of the touchsensors.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var position = new Blockly.FieldDropdown([ 
	        	[ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], 
	        	[ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ],
	        	[Blockly.Msg.NAO_HEADSENSOR, 'HEAD']
	        ]);
	        var side = new Blockly.FieldDropdown([ 
	        	[Blockly.Msg.MOTOR_LEFT, 'LEFT'], 
	        	[Blockly.Msg.MOTOR_RIGHT, 'RIGHT'],
	        	[Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT'],
	        	[Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE'],
	        	[Blockly.Msg.NAO_TOUCH_REAR, 'REAR']
	        ]);
	        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_IS_PIN + ' ' + Blockly.Msg.SENSOR_TOUCH).appendField(position, 'POSITION').appendField(side, 'SIDE').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
	        this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_TOUCHSENSOR_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_sonar'] = {
	    /**
	     * Get the current reading from the sonar.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_SONAR);
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.ULTRASONIC_GETSAMPLE_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_gyrometer'] = {
	    /**
	     * Get the current reading from the gyro sensor.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_GYROMETER).appendField(dropdown, 'COORDINATE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_GYROMETER_TOOLTIP);
	    }
	};


Blockly.Blocks['naoSensors_accelerometer'] = {
	    /**
	     * Get the current reading from the accelerometer.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ], [ 'Z', 'Z' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_ACCELEROMETER).appendField(dropdown, 'COORDINATE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_ACCELEROMETER_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_fsr'] = {
	    /**
	     * Get the current reading from the accelerometer.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_FSR).appendField(side, 'SIDE');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_FSR_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_getCurrent'] = {
	    /**
	     * NAO returns the voltage of a joint
	     *
	     * @constructs naoActions_moveJoint
	     * @this.Blockly.Block
	     * @param {String}
	     *            JOINT that is moved
	     * @param {Number}
	     *            POWER degrees the joint is moved
	     * @returns immediately
	     * @memberof Block
	     */
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_JOINT_HEADYAW, 'HeadYaw' ], [ Blockly.Msg.NAO_JOINT_HEADPITCH, 'HeadPitch' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'LShoulderPitch' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'LshoulderRoll' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'LElbowYaw' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'LElbowRoll' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'LWristYaw' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HAND, 'LHand' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'LHipYawPitch' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'LHipRoll' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'LHipPitch' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'LKneePitch' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'LAnklePitch' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'RAnkleRoll' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'RHipYawPitch' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'RHipRoll' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'RHipPitch' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'RKneePitch' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'RAnklePitch' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'LAnkleRoll' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'RShoulderPitch' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'RShoulderRoll' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'RElbowYaw' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'RElbowRoll' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'RWristYaw' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HAND, 'RHand' ] ]);
	        this.appendDummyInput().appendField(Blockly.Msg.GET).appendField(Blockly.Msg.NAO_CURRENT).appendField(dropdown, 'joint');
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_GETCURRENT_TOOLTIP);
	    }
	};

Blockly.Blocks['naoSensors_naoMark'] = {
	    /**
	     * Get the number of a detected NAOMark.
	     */

	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_NAOMARK);
	        this.setOutput(true, 'Number');
	        this.setTooltip(Blockly.Msg.NAO_NAOMARK_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_learnFace'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendValueInput('NAME').appendField(Blockly.Msg.NAO_LEARNFACEOF);
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	        this.setTooltip(Blockly.Msg.NAO_LEARNFACE_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_forgetFace'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendValueInput('NAME').appendField(Blockly.Msg.NAO_FORGETFACEOF);
	        this.setPreviousStatement(true);
	        this.setNextStatement(true);
	        this.setTooltip(Blockly.Msg.NAO_FORGETFACE_TOOLTIP);
	    }
};

Blockly.Blocks['naoSensors_detectFace'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_SENSOR_RGB);
	        this.appendDummyInput().appendField(Blockly.Msg.NAO_DETECTFACE);
	        this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_DETECTFACE_TOOLTIP);
	    }
};

/**
 * Block waiting for a word recognition
 * 
 * @constructs naoSensors_chat
 * @param {Boolean} -
 *            any condition.
 * @returns after (first) condition is true.
 * @memberof Block
 */

Blockly.Blocks['naoSensors_chat'] = {

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        // this.setInputsInline(true);
        this.appendValueInput('WAIT0').appendField(Blockly.Msg.NAO_RECOGNIZEWORD).setCheck('String');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.lineCount_ = 0;
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setTooltip(Blockly.Msg.NAO_CHAT_TOOLTIP);
    },
    /**
     * Create XML to represent the number of wait counts.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        if (!this.lineCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.lineCount_) {
            container.setAttribute('wait', this.lineCount_);
        }
        return container;
    },

    /**
     * Parse XML to restore the wait inputs.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.lineCount_ = parseInt(xmlElement.getAttribute('wait'), 10);
        for (var x = 1; x <= this.lineCount_; x++) {
            if (x == 1) {
                this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
            }
            this.appendValueInput('WAIT' + x).appendField(Blockly.Msg.NAO_RECOGNIZEWORDOR).setCheck('String');
            this.appendStatementInput('DO' + x).appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        }
        if (this.lineCount_ >= 1) {
            this.setMutatorMinus(new Blockly.MutatorMinus(this));
        }
    },
    /**
     * Update the shape according to the number of wait inputs.
     * 
     * @param {Number}
     *            number of waits inputs.
     * @this Blockly.Block
     */
    updateShape_ : function(num) {
        Blockly.dragMode_ = Blockly.DRAG_NONE;
        if (num == 1) {
            this.lineCount_++;
            if (this.lineCount_ == 1)
                this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
            this.appendValueInput('WAIT' + this.lineCount_).appendField(Blockly.Msg.NAO_RECOGNIZEWORDOR).setCheck('String');
            this.appendStatementInput('DO' + this.lineCount_).appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        } else if (num == -1) {
            var target = this.getInputTargetBlock('DO' + this.lineCount_);
            if (target) {
                target.unplug();
                target.bumpNeighbours_();
            }
            var target = this.getInputTargetBlock('WAIT' + this.lineCount_);
            if (target) {
                target.unplug();
                target.bumpNeighbours_();
            }
            this.removeInput('DO' + this.lineCount_);
            this.removeInput('WAIT' + this.lineCount_);
            this.lineCount_--;
            if (this.lineCount_ == 0) {
                this.removeInput('DO0');
            }
            this.itemCount_--;
            this.removeInput('ADD' + this.itemCount_);
        }
        if (this.waitCount_ >= 1) {
            if (this.waitCount_ == 1) {
                this.setMutatorMinus(new Blockly.MutatorMinus(this));
                this.render();
            }
        } else {
            this.mutatorMinus.dispose();
            this.mutatorMinus = null;
            this.render();
        }
    }
};
