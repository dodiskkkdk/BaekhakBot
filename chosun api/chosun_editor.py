/*
from kocrawl.editor.base_editor import BaseEditor
import re


class ChosunEditor(BaseEditor):

    def edit_chosun(self, result: dict) -> dict:
        print('run edit_chosun!')
        """
        join_dict를 사용하여 딕셔너리에 있는 string 배열들을
        하나의 string으로 join합니다.
        :param location: 지역
        :param place: 장소
        :param result: 데이터 딕셔너리
        :return: 수정된 딕셔너리
        """

        #information = result['context']
        #print(information)
        #result = {'context': information}
        #print(result)
        return result
*/
from kocrawl.editor.base_editor import BaseEditor
import re


class ChosunEditor(BaseEditor):

    def edit_chosun(self, result: dict) -> dict:
        print('run edit_chosun!')
        """
        join_dict를 사용하여 딕셔너리에 있는 string 배열들을
        하나의 string으로 join합니다.
        :param location: 지역
        :param place: 장소
        :param result: 데이터 딕셔너리
        :return: 수정된 딕셔너리
        """

        result=self.join_dict(result,'context')
        if isinstance(result['context'],str):
            result['context'] = re.sub(' ', ', ', result['context'])
        #information = result['context']
        #print(information)
        #result = {'context': information}
        #print(result)
        return result
