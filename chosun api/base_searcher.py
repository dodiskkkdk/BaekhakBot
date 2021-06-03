import json
import urllib
from abc import ABCMeta, abstractmethod
from urllib.request import urlopen, Request

import bs4
import requests

from kocrawl.base import BaseCrawler
from kocrawl.decorators import searcher

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time
from konlpy.tag import Kkma
import openpyxl
import urllib.request

@searcher
class BaseSearcher(BaseCrawler, metaclass=ABCMeta):

    @abstractmethod
    def _make_query(self, *args, **kwargs):
        raise NotImplementedError

    def __bs4(self, url: str, query: str) -> bs4.BeautifulSoup:
        """
        beautiful soup 4를 이용하여 정적 웹페이지에 대한 크롤링을 시도합니다.

        :param url: 베이스 url
        :param query: 검색할 쿼리
        :return: parsing된 html
        """

        if query:
            url += urllib.parse.quote(query)

        out = bs4.BeautifulSoup(urlopen(Request(url, headers=self.headers)).read(), 'html.parser')
        return out
    def _bs4_contents_chosun(self, url: str, selectors: list, search_word_enc: str = ""):
        """
        beautiful soup 4를 이용하여 정적 웹페이지에 대한 크롤링을 시도합니다.
        셀렉터를 적용하여 입력한 셀렉터에 해당하는 태그 안의 contents를 로드합니다.

        :param url: 베이스 url
        :param selectors: 검색할 셀렉터
        :param query: 검색할 쿼리
        :return: 크롤링된 콘텐츠
        """

        # out = self.__bs4(url, query)
        try:
            chrome_options=webdriver.ChromeOptions()
            chrome_options.add_argument('headless')
            crawled=[]
            search_addr = "https://www.google.com/search?q="
            search_addr2 = "+site%3Achosun.ac.kr"
            search_word_enc1 = urllib.parse.quote(search_word_enc)
            URL = search_addr + search_word_enc1 + search_addr2
            print(URL)

            # f = open('webtitle,con.txt', 'a', encoding='utf-8')
            # f2 = open('weburl.txt', 'a', encoding='utf-8')

            chromedriver = 'C:\\chromedriver.exe'
            driver = webdriver.Chrome(chromedriver,chrome_options=chrome_options)
            driver.get(URL)

            html = driver.page_source
            soup = BeautifulSoup(html)

            r = soup.select('.yuRUbf')
            rr = r[:1]
            for i in rr:
                print(i.a.attrs['href'])
                c = str(i.a.attrs['href'])
                crawled.append(c)
            #print(c)
            driver.quit()
            return crawled
        except Exception:
            return None

    def _bs4_contents(self, url: str, selectors: list, query: str = ""):
        """
        beautiful soup 4를 이용하여 정적 웹페이지에 대한 크롤링을 시도합니다.
        셀렉터를 적용하여 입력한 셀렉터에 해당하는 태그 안의 contents를 로드합니다.

        :param url: 베이스 url
        :param selectors: 검색할 셀렉터
        :param query: 검색할 쿼리
        :return: 크롤링된 콘텐츠
        """

        out = self.__bs4(url, query)
        try:
            crawled = []
            for selector in selectors:
                for s in out.select(selector):
                    crawled.append(s.contents)
            return crawled
        except Exception:
            return None

    def _bs4_documents(self, url: str, selectors: list, query: str = ""):
        """
        beautiful soup 4를 이용하여 정적 웹페이지에 대한 크롤링을 시도합니다.
        셀렉터를 적용하여 입력한 셀렉터에 해당하는 태그를 포함한 모든 document 구조를 로드합니다.

        :param url: 베이스 url
        :param selectors: 검색할 셀렉터
        :param query: 검색할 쿼리
        :return: 크롤링된 콘텐츠
        """

        out = self.__bs4(url, query)
        try:
            crawled = []
            for selector in selectors:
                for s in out.select(selector):
                    crawled.append(s)
            return crawled
        except Exception:
            return None

    def _json(self, url: str, query: str):
        """
        json을 이용하여 동적 웹페이지에 대한 크롤링을 시도합니다.

        :param url: 베이스 url
        :param query: 검색할 쿼리
        :return: 크롤링된 json 파일
        """

        if query:
            url += urllib.parse.quote(query)

        req = requests.get(url, headers=self.headers)
        if req.status_code == requests.codes.ok:
            loaded_data = json.loads(req.text)
            return loaded_data
        else:
            return None
