/**
 * StringUtils.js
 * - 자주 사용하는 문자열 처리 유틸리티
 * 
 * @author CHO HYUNKWON
 * @update 2018-09-19
 */
'use strict';
var HK_STR = (function() {
	return {
		/**
		 * 주민/외국인 등록번호 유효성 검사
		 * 
		 * @param ssn, 13자리 주민 또는 외국인 등록번호
		 * @return 주민/외국인 등록번호 유효성
		 * @author CHO HYUNKWON
		 */
		isValidSsn : _isValidSsn,
		
		/**
		 * 주민등록번호(내국인) 유효성 검사
		 * 
		 * @param rrn, 13자리 주민등록번호
		 * @return 주민등록번호 유효성
		 * @author CHO HYUNKWON
		 */
		isValidRrn : function(rrn) {
			if(!_isValidSsn(rrn)) return false;
			var t = ['1','2','3','4','9','0'];
			return t.indexOf(rrn.charAt(6)) > -1;
		},
		
		/**
		 * 외국인등록번호 유효성 검사
		 * 
		 * @param frn, 13자리 외국인등록번호
		 * @return 외국인 등록번호 유효성
		 * @author CHO HYUNKWON
		 */
		isValidFrn : function(frn) {
			if(!_isValidSsn(frn)) return false;
			var t = ['5','6','7','8'];
			return t.indexOf(frn.charAt(6)) > -1;
		},
		
		/**
		 * 주민/외국인등록번호 마스킹 처리
		 * 
		 * @param ssn, [Mandatory] 13자리 주민등록번호 또는 외국인등록번호
		 * @param type, [Optional] 마스킹 타입 (default: 1)
		 * @return 마스킹된 주민/외국인등록번호
		 * <pre>
		 * 	type = 1 --> 880415-*******
		 * 	type = 2 --> 880415-1******
		 * </pre>
		 * @author CHO HYUNKWON
		 */
		maskSsn : function(ssn, type) {
			var t = (type || 1)*1, ssn1 = ssn.substr(0,6), masked;
			switch(t) {
			case 1 : masked = "*******"; break;
			case 2 : masked = ssn.substr(6,12).charAt(0)+"******"; break;
			}
			return ssn1+"-"+masked;
		},
		
		/**
		 * 전화번호에 hypen(-)을 추가
		 * @param phoneNo, 핸드폰 또는 전화번호
		 * @return hypen이 추가된 전화번호
		 * <pre>
		 * 	01043219876 -> 010-4321-9876
		 * 	023334444 -> 02-333-4444
		 * </pre>
		 * @author CHO HYUNKWON
		 */
		hypenPhoneNo : function(phoneNo) {
			return phoneNo.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
		}
	};
	////////////////////////////////////////////////////////////////////////////
	//	PRIVATE FUNCTIONS
	////////////////////////////////////////////////////////////////////////////
	/* 주민/외국인 등록번호 유효성 검사 */
	function _isValidSsn (_ssn) {
		if(_ssn.length != 13 || _ssn.match('[^0-9]')) return false;
		var cnts = [2,3,4,5,6,7,8,9,2,3,4,5], sum = 0;
		for (var i=0; i<12; i++) sum += (_ssn.charAt(i) * cnts[i]);
		return (((11-(sum%11))%11) == _ssn.charAt(12));
	}
})();