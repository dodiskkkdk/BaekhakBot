from kocrawl.answerer.chosun_answerer import ChosunAnswerer
from kocrawl.base import BaseCrawler
from kocrawl.editor.chosun_editor import ChosunEditor
from kocrawl.searcher.chosun_searcher import ChosunSearcher


class ChosunCrawler(BaseCrawler):

    def request(self, info: str) -> str:
        try:
            return self.request_debug(info)[0]
        except Exception as e:
            print(e)
            return ChosunAnswerer().sorry(
                '리퀘 그 정보는 알 수가 없어요.'
            )

    def request_dict(self, info: str):
        try:
            return self.request_debug(info)[1]
        except Exception:
            return ChosunAnswerer().sorry(
                '리퀘딕트 그 정보는 알 수가 없어요.'
            )

    def request_debug(self, info: str) -> tuple:
        result_dict = ChosunSearcher().search_chosun(info)
        #print(result_dict)
        result = ChosunEditor().edit_chosun(result_dict)
        result=ChosunAnswerer().chosun_form(info, result)
        return result, result_dict