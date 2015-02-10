# coding: utf-8
# Based on convert script from vwall/compass-twitter-bootstrap gem.
# https://github.com/vwall/compass-twitter-bootstrap/blob/master/build/convert.rb
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this work except in compliance with the License.
# You may obtain a copy of the License in the LICENSE file, or at:
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require 'open-uri'
require 'json'
require 'strscan'
require 'forwardable'
require 'term/ansicolor'
require 'fileutils'

require_relative 'converter/fonts_conversion'
require_relative 'converter/less_conversion'
require_relative 'converter/js_conversion'
require_relative 'converter/logger'

class Converter
  extend Forwardable
  include LessConversion
  include JsConversion
  include FontsConversion

  def initialize()
    @logger     = Logger.new
    @save_to    = {
        js:    'assets/javascripts/bootstrap',
        scss:  'assets/stylesheets/bootstrap',
        fonts: 'assets/fonts/bootstrap'
    }
  end

  def_delegators :@logger, :log, :log_status, :log_processing, :log_transform, :log_file_info, :log_processed, :log_http_get_file, :log_http_get_files, :silence_log

  def process_bootstrap
    log_status "Convert Bootstrap LESS to SASS"
    puts " save to: #{@save_to.to_json}"

    @save_to.each { |_, v| FileUtils.mkdir_p(v) }

    process_font_assets
    process_stylesheet_assets
    process_javascript_assets
  end

  def save_file(path, content, mode='w')
    dir = File.dirname(path)
    FileUtils.mkdir_p(dir) unless File.directory?(dir)
    File.open(path, mode) { |file| file.write(content) }
  end

  # Update version.rb file with BOOTSTRAP_SHA
  def store_version
    path    = 'lib/bootstrap-sass/version.rb'
    content = File.read(path).sub(/BOOTSTRAP_SHA\s*=\s*['"][\w]+['"]/, "BOOTSTRAP_SHA = '#@branch_sha'")
    File.open(path, 'w') { |f| f.write(content) }
  end
end